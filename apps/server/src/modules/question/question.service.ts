import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { createId, question } from '@survey/schema'
import { DB, DbType } from '../global/providers/db.provider'

@Injectable()
export class QuestionService {
  constructor() { }
  @Inject(DB)
  private db: DbType

  async create() {
    const id = createId()
    try {
      await this.db.insert(question).values({ id, title: `新建问卷${Math.random().toString().slice(2, 8)}` })
    }
    catch (e) {
      throw new BadRequestException(e)
    }
    return id
  }
}
