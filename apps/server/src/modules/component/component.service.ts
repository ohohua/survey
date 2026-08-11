import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { component, question } from '@survey/schema'
import { and, eq, getTableColumns } from 'drizzle-orm'
import { DB, DbType } from '../global/providers/db.provider'
import { CreateComponentDto } from './model/component.dto'

@Injectable()
export class ComponentService {
  constructor() { }
  @Inject(DB)
  private db: DbType

  async create(dto: CreateComponentDto, userId: string) {
    const { questionId, type, sort, props } = dto
    await this.ensureOwnQuestion(questionId, userId)
    await this.db.insert(component).values({ questionId, type, sort, props })
    return '创建成功'
  }

  async getComponentListByQuestionId(questionId: string, userId: string) {
    await this.ensureOwnQuestion(questionId, userId)
    const { isDeleted, ...rest } = getTableColumns(component)
    return await this.db.select(rest).from(component).where(eq(component.questionId, questionId))
  }

  private async ensureOwnQuestion(questionId: string, userId: string) {
    const hasQuestion = await this.db.select({ id: question.id }).from(question).where(and(eq(question.id, questionId), eq(question.userId, userId), eq(question.isDeleted, false)))
    if (!hasQuestion.length) {
      throw new BadRequestException('问卷不存在')
    }
  }
}
