import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { component, createId, question } from '@survey/schema'
import { asc, eq, getTableColumns, like, sql } from 'drizzle-orm'
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
    // 要么全成功, 要么都失败
    await this.db.transaction(async (tx) => {
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

  async loadQuestionList(pageIndex: number, pageSize: number, title?: string) {
    const offset = (pageIndex - 1) * pageSize
    const whereClause = title ? like(question.title, `%${title}%`) : undefined
    const { isDeleted, ...rest } = getTableColumns(question)
    const list = await this.db.select(rest).from(question).where(whereClause).limit(pageSize).offset(offset)

    const totalResult = await this.db
      .select({ count: sql<number>`count(*)` })
      .from(question)
      .where(whereClause) // 添加查询条件

    return {
      list,
      total: totalResult[0].count,
    }
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
}
