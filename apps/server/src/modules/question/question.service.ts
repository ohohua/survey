import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { component, createId, question } from '@survey/schema'
import { and, asc, eq, getTableColumns, like, sql } from 'drizzle-orm'
import { DB, DbType } from '../global/providers/db.provider'
import { CreateQuestionDto, UpdateQuestionDto } from './model/question.dto'

@Injectable()
export class QuestionService {
  constructor() { }
  @Inject(DB)
  private db: DbType

  async newQuestionnaire(dto: CreateQuestionDto) {
    const id = createId()
    const { backgroundImage, pageHeaderImage, components } = dto
    try {
      await this.db.insert(question).values({ id, title: dto.title || `问卷${id}`, backgroundImage, pageHeaderImage })

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

  async editQuestionnaire(dto: UpdateQuestionDto) {
    const { id, title, backgroundImage, pageHeaderImage, components } = dto
    await this.db.update(question).set({ title, backgroundImage, pageHeaderImage }).where(eq(question.id, id))

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

  async issueQuestionnaire(id: string) {
    const hasQuestion = await this.db.select({ isPublished: question.isPublished, isDeleted: question.isDeleted }).from(question).where(eq(question.id, id))
    if (!hasQuestion || !hasQuestion.length) {
      throw new BadRequestException('请先保存问卷')
    }
    if (hasQuestion[0].isPublished) {
      throw new BadRequestException('问卷已发布')
    }
    if (hasQuestion[0].isDeleted) {
      throw new BadRequestException('问卷已删除')
    }
    await this.db.update(question).set({ isPublished: true }).where(eq(question.id, id))

    return id
  }

  async loadQuestionList(current: number, pageSize: number, title?: string, star: boolean = false) {
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
      .where(and(whereClause, isStar, eq(isDeleted, false)))
      .limit(pageSize)
      .offset(offset)

    const list = result.map(({ total, ...item }) => item)
    const total = result.length > 0 ? result[0].total : 0

    return {
      list,
      total,
    }
  }

  async loadQuestionStarList(current: number, pageSize: number, title?: string) {
    return await this.loadQuestionList(current, pageSize, title, true)
  }

  async loadQuestionTrashList(current: number, pageSize: number, title?: string) {
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
      .where(and(whereClause, eq(isDeleted, true)))
      .limit(pageSize)
      .offset(offset)

    // 提取列表数据和总数
    const list = result.map(({ total, ...item }) => item)
    const total = result.length > 0 ? result[0].total : 0

    return {
      list,
      total,
    }
  }

  deleteQuestionTrash(ids: string) {
    const idList = ids.split(',')
    if (!idList || !idList.length) {
      throw new BadRequestException('id 错误')
    }
    // 物理删除
    this.db.transaction(async (tx) => {
      for (const id of idList) {
        await tx.delete(component).where(eq(component.questionId, id))
        await tx.delete(question).where(eq(question.id, id))
      }
    }).then(() => {
      return '删除成功'
    }).catch((e) => {
      throw new BadRequestException(e)
    })
  }

  async loadDetail(questionId: string) {
    const { isDeleted, createAt, updatedAt, ...rest } = getTableColumns(question)
    const questionInfo = await this.db
      .select({ ...rest })
      .from(question)
      .where(eq(question.id, questionId))

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

  async starQuestionnaire(id: string) {
    const hasQuestion = await this.db.select({ isStar: question.isStar })
      .from(question)
      .where(and(eq(question.id, id), eq(question.isDeleted, false)))

    if (!hasQuestion || !hasQuestion.length) {
      throw new BadRequestException('问卷不存在')
    }

    await this.db.update(question).set({ isStar: !hasQuestion[0].isStar }).where(eq(question.id, id))

    return !hasQuestion[0].isStar ? '标星成功' : '取消标星成功'
  }

  async deleteQuestionnaire(id: string) {
    const hasQuestion = await this.db.select()
      .from(question)
      .where(and(eq(question.id, id), eq(question.isDeleted, false)))

    if (!hasQuestion || !hasQuestion.length) {
      throw new BadRequestException('问卷不存在')
    }

    await this.db.update(question).set({ isDeleted: true }).where(eq(question.id, id))

    return '删除成功'
  }

  async copyQuestionnaire(id: string) {
    const hasQuestion = await this.db.select()
      .from(question)
      .where(and(eq(question.id, id), eq(question.isDeleted, false)))

    if (!hasQuestion || !hasQuestion.length) {
      throw new BadRequestException('问卷不存在')
    }

    await this.db.insert(question).values({ ...hasQuestion[0], id: createId() })

    return '复制成功'
  }

  async restoreQuestionnaire(ids: string) {
    const idList = ids.split(',')
    idList.forEach(async (id) => {
      const hasQuestion = await this.db.select()
        .from(question)
        .where(and(eq(question.id, id), eq(question.isDeleted, true)))

      if (!hasQuestion || !hasQuestion.length) {
        throw new BadRequestException('问卷不存在或未被删除')
      }
      await this.db.update(question).set({ isDeleted: false }).where(eq(question.id, id))
    })

    return '恢复成功'
  }
}
