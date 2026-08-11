import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { answer, component, createId, question } from '@survey/schema'
import * as dayjs from 'dayjs'
import { and, asc, eq, getTableColumns, inArray, like, sql } from 'drizzle-orm'
import { DB, DbType } from '../global/providers/db.provider'
import { CreateQuestionDto, UpdateQuestionDto } from './model/question.dto'

@Injectable()
export class QuestionService {
  constructor() { }
  @Inject(DB)
  private db: DbType

  async newQuestionnaire(dto: CreateQuestionDto, userId: string) {
    const id = createId()
    const { backgroundImage, pageHeaderImage, components } = dto
    try {
      await this.db.insert(question).values({ id, userId, title: dto.title || `问卷${id}`, backgroundImage, pageHeaderImage })

      if (!components || !components.length) {
        return id
      }
      for (const c of components) {
        await this.db.insert(component).values({ type: c.type, props: c.props, sort: c.sort, questionId: id })
      }
    }
    catch (e) {
      throw new BadRequestException(e)
    }
    return id
  }

  async editQuestionnaire(dto: UpdateQuestionDto, userId: string) {
    const { id, title, backgroundImage, pageHeaderImage, components } = dto
    const hasQuestion = await this.findOwnQuestion(id, userId, false)
    if (!hasQuestion.length) {
      throw new BadRequestException('问卷不存在')
    }
    await this.db.update(question).set({ title, backgroundImage, pageHeaderImage }).where(and(eq(question.id, id), eq(question.userId, userId)))

    if (!components || !components.length) {
      return '修改成功'
    }
    // dto 中没有的组件需要删除
    // 查询当前问卷下的所有组件id
    const hasComponent = await this.db.select({ id: component.id }).from(component).where(eq(component.questionId, id))
    // 需要删除的组件
    const needDel = hasComponent.filter(item => !components.some(c => c.id === item.id))

    // 要么全成功, 要么都失败
    await this.db.transaction(async (tx) => {
      // 物理删除组件
      for (const c of needDel) {
        await tx.delete(component).where(and(eq(component.questionId, id), eq(component.id, c.id)))
      }

      for (const c of components) {
        if (c.id) {
          await tx.update(component).set({ type: c.type, props: c.props, sort: c.sort }).where(eq(component.id, c.id))
        }
        else {
          await tx.insert(component).values({ ...c })
        }
      }
    })
    return '修改成功'
  }

  async issueQuestionnaire(id: string, userId: string) {
    const hasQuestion = await this.db.select({ isPublished: question.isPublished, isDeleted: question.isDeleted }).from(question).where(and(eq(question.id, id), eq(question.userId, userId)))
    if (!hasQuestion || !hasQuestion.length) {
      throw new BadRequestException('请先保存问卷')
    }
    if (hasQuestion[0].isPublished) {
      throw new BadRequestException('问卷已发布')
    }
    if (hasQuestion[0].isDeleted) {
      throw new BadRequestException('问卷已删除')
    }
    await this.db.update(question).set({ isPublished: true }).where(and(eq(question.id, id), eq(question.userId, userId)))

    return id
  }

  async loadQuestionList(current: number, pageSize: number, title?: string, userId?: string, star: boolean = false) {
    const offset = (current - 1) * pageSize
    const whereClause = title ? like(question.title, `%${title}%`) : undefined
    const isStar = star ? eq(question.isStar, star) : undefined
    const { isDeleted, ...rest } = getTableColumns(question)
    const result = await this.db
      .select({
        ...rest,
        total: sql<number>`COUNT(*) OVER()`, // 使用窗口函数计算总数
      })
      .from(question)
      .where(and(whereClause, isStar, eq(question.userId, userId || ''), eq(isDeleted, false)))
      .limit(pageSize)
      .offset(offset)

    const list = result.map(({ total, ...item }) => this.formatQuestionListItem(item))
    const total = result.length > 0 ? result[0].total : 0

    return {
      list,
      total,
    }
  }

  async loadQuestionStarList(current: number, pageSize: number, title: string | undefined, userId: string) {
    return await this.loadQuestionList(current, pageSize, title, userId, true)
  }

  async loadQuestionTrashList(current: number, pageSize: number, title: string | undefined, userId: string) {
    const offset = (current - 1) * pageSize
    const whereClause = title ? like(question.title, `%${title}%`) : undefined
    const { isDeleted, ...rest } = getTableColumns(question)
    // 合并查询
    const result = await this.db
      .select({
        ...rest,
        total: sql<number>`COUNT(*) OVER()`, // 使用窗口函数计算总数
      })
      .from(question)
      .where(and(whereClause, eq(question.userId, userId), eq(isDeleted, true)))
      .limit(pageSize)
      .offset(offset)

    // 提取列表数据和总数
    const list = result.map(({ total, ...item }) => this.formatQuestionListItem(item))
    const total = result.length > 0 ? result[0].total : 0

    return {
      list,
      total,
    }
  }

  async loadOverview(userId: string) {
    const todayStart = dayjs().startOf('day').toDate()
    const sevenDaysAgo = dayjs().subtract(6, 'day').startOf('day').toDate()

    const [questionStat] = await this.db
      .select({
        totalQuestionCount: sql<number>`COUNT(*)`,
        publishedQuestionCount: sql<number>`COALESCE(SUM(CASE WHEN ${question.isPublished} THEN 1 ELSE 0 END), 0)`,
        todayQuestionCount: sql<number>`COALESCE(SUM(CASE WHEN ${question.createAt} >= ${todayStart} THEN 1 ELSE 0 END), 0)`,
        totalAnswerCount: sql<number>`COALESCE(SUM(${question.answerCount}), 0)`,
      })
      .from(question)
      .where(and(eq(question.userId, userId), eq(question.isDeleted, false)))

    const [todayAnswerStat] = await this.db
      .select({
        todayAnswerCount: sql<number>`COUNT(DISTINCT ${answer.submitId})`,
      })
      .from(answer)
      .innerJoin(question, eq(answer.questionId, question.id))
      .where(and(
        eq(question.userId, userId),
        eq(question.isDeleted, false),
        sql`${answer.createAt} >= ${todayStart}`,
      ))

    const recentAnswerRows = await this.db
      .select({
        date: sql<string>`DATE(${answer.createAt})`,
        count: sql<number>`COUNT(DISTINCT ${answer.submitId})`,
      })
      .from(answer)
      .innerJoin(question, eq(answer.questionId, question.id))
      .where(and(
        eq(question.userId, userId),
        eq(question.isDeleted, false),
        sql`${answer.createAt} >= ${sevenDaysAgo}`,
      ))
      .groupBy(sql`DATE(${answer.createAt})`)

    const recentAnswerMap = recentAnswerRows.reduce<Record<string, number>>((map, item) => {
      map[item.date] = Number(item.count) || 0
      return map
    }, {})
    const recentAnswerTrend = Array.from({ length: 7 }, (_, index) => {
      const date = dayjs().subtract(6 - index, 'day').format('YYYY-MM-DD')
      return {
        date,
        count: recentAnswerMap[date] || 0,
      }
    })

    const totalQuestionCount = Number(questionStat?.totalQuestionCount) || 0
    const publishedQuestionCount = Number(questionStat?.publishedQuestionCount) || 0

    return {
      totalQuestionCount,
      publishedQuestionCount,
      todayQuestionCount: Number(questionStat?.todayQuestionCount) || 0,
      totalAnswerCount: Number(questionStat?.totalAnswerCount) || 0,
      todayAnswerCount: Number(todayAnswerStat?.todayAnswerCount) || 0,
      publishedRate: totalQuestionCount ? Math.round((publishedQuestionCount / totalQuestionCount) * 100) : 0,
      recentAnswerTrend,
    }
  }

  async deleteQuestionTrash(ids: string, userId: string) {
    const idList = ids.split(',')
    if (!idList || !idList.length) {
      throw new BadRequestException('id 错误')
    }
    // 物理删除
    await this.db.transaction(async (tx) => {
      for (const id of idList) {
        const hasQuestion = await tx.select({ id: question.id }).from(question).where(and(eq(question.id, id), eq(question.userId, userId), eq(question.isDeleted, true)))
        if (!hasQuestion.length) {
          throw new BadRequestException('问卷不存在或未被删除')
        }
        await tx.delete(answer).where(eq(answer.questionId, id))
        await tx.delete(component).where(eq(component.questionId, id))
        await tx.delete(question).where(eq(question.id, id))
      }
    })

    return '删除成功'
  }

  async loadDetail(questionId: string, userId: string) {
    const { isDeleted, createAt, updatedAt, ...rest } = getTableColumns(question)
    const questionInfo = await this.db
      .select({ ...rest })
      .from(question)
      .where(and(eq(question.id, questionId), eq(question.userId, userId)))

    if (questionInfo.length === 0) {
      throw new BadRequestException('id 错误')
    }

    const id = questionInfo[0].id
    const { isDeleted: del, createAt: cAt, updatedAt: uAt, ...restComponent } = getTableColumns(component)
    const componentList = await this.db
      .select(restComponent)
      .from(component)
      .where(eq(component.questionId, id))
      .orderBy(asc(component.sort))

    return {
      ...questionInfo[0],
      componentList,
    }
  }

  async loadPublishedDetail(questionId: string) {
    const { isDeleted, createAt, updatedAt, ...rest } = getTableColumns(question)
    const questionInfo = await this.db
      .select({ ...rest })
      .from(question)
      .where(and(eq(question.id, questionId), eq(question.isPublished, true), eq(question.isDeleted, false)))

    if (questionInfo.length === 0) {
      throw new BadRequestException('问卷不存在或未发布')
    }

    const { isDeleted: del, createAt: cAt, updatedAt: uAt, ...restComponent } = getTableColumns(component)
    const componentList = await this.db
      .select(restComponent)
      .from(component)
      .where(and(eq(component.questionId, questionId), eq(component.isDeleted, false)))
      .orderBy(asc(component.sort))

    return {
      ...questionInfo[0],
      componentList,
    }
  }

  async starQuestionnaire(id: string, userId: string) {
    const hasQuestion = await this.db.select({ isStar: question.isStar })
      .from(question)
      .where(and(eq(question.id, id), eq(question.userId, userId), eq(question.isDeleted, false)))

    if (!hasQuestion || !hasQuestion.length) {
      throw new BadRequestException('问卷不存在')
    }

    await this.db.update(question).set({ isStar: !hasQuestion[0].isStar }).where(and(eq(question.id, id), eq(question.userId, userId)))

    return !hasQuestion[0].isStar ? '标星成功' : '取消标星成功'
  }

  async deleteQuestionnaire(id: string, userId: string) {
    const hasQuestion = await this.db.select()
      .from(question)
      .where(and(eq(question.id, id), eq(question.userId, userId), eq(question.isDeleted, false)))

    if (!hasQuestion || !hasQuestion.length) {
      throw new BadRequestException('问卷不存在')
    }

    await this.db.transaction(async (tx) => {
      await tx.update(question).set({ isDeleted: true, answerCount: 0 }).where(and(eq(question.id, id), eq(question.userId, userId)))
      await tx.delete(answer).where(eq(answer.questionId, id))
    })

    return '删除成功'
  }

  async copyQuestionnaire(id: string, userId: string) {
    const hasQuestion = await this.db.select()
      .from(question)
      .where(and(eq(question.id, id), eq(question.userId, userId), eq(question.isDeleted, false)))

    if (!hasQuestion || !hasQuestion.length) {
      throw new BadRequestException('问卷不存在')
    }

    const questionId = createId()
    const hasComponents = await this.db.select()
      .from(component)
      .where(eq(component.questionId, id))

    await this.db.transaction(async (tx) => {
      const { id: sourceId, createAt, updatedAt, ...sourceQuestion } = hasQuestion[0]
      await tx.insert(question).values({
        ...sourceQuestion,
        id: questionId,
        userId,
        title: `${hasQuestion[0].title} 副本`,
        isPublished: false,
        answerCount: 0,
      })

      if (hasComponents.length) {
        await tx.insert(component).values(hasComponents.map((item) => {
          const { id: componentId, createAt, updatedAt, ...rest } = item
          return {
            ...rest,
            id: createId(),
            questionId,
          }
        }))
      }
    })

    return '复制成功'
  }

  async restoreQuestionnaire(ids: string, userId: string) {
    const idList = ids.split(',').filter(Boolean)
    if (!idList.length) {
      throw new BadRequestException('id 错误')
    }

    const deletedQuestions = await this.db.select({ id: question.id })
      .from(question)
      .where(and(inArray(question.id, idList), eq(question.userId, userId), eq(question.isDeleted, true)))

    if (deletedQuestions.length !== idList.length) {
      throw new BadRequestException('问卷不存在或未被删除')
    }

    await this.db.transaction(async (tx) => {
      for (const id of idList) {
        await tx.update(question).set({ isDeleted: false }).where(and(eq(question.id, id), eq(question.userId, userId)))
      }
    })

    return '恢复成功'
  }

  private findOwnQuestion(id: string, userId: string, isDeleted = false) {
    return this.db.select({ id: question.id }).from(question).where(and(eq(question.id, id), eq(question.userId, userId), eq(question.isDeleted, isDeleted)))
  }

  private formatQuestionListItem<T extends { createAt?: Date | string | null }>(item: T) {
    return {
      ...item,
      createAt: item.createAt ? dayjs(item.createAt).format('YYYY-MM-DD HH:mm:ss') : item.createAt,
    }
  }
}
