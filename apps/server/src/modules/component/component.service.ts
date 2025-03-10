import { Inject, Injectable } from '@nestjs/common'
import { component } from '@survey/schema'
import { eq, getTableColumns } from 'drizzle-orm'
import { DB, DbType } from '../global/providers/db.provider'
import { CreateComponentDto } from './model/component.dto'

@Injectable()
export class ComponentService {
  constructor() { }
  @Inject(DB)
  private db: DbType

  async create(dto: CreateComponentDto) {
    const { questionId, type, sort, props } = dto
    await this.db.insert(component).values({ questionId, type, sort, props })
    return '创建成功'
  }

  async getComponentListByQuestionId(questionId: string) {
    const { isDeleted, ...rest } = getTableColumns(component)
    return await this.db.select(rest).from(component).where(eq(component.questionId, questionId))
  }
}
