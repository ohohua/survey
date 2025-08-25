import { Inject, Injectable } from '@nestjs/common'
import { DB, DbType } from '../global/providers/db.provider'

@Injectable()
export class AnswerService {
  constructor() {}

  @Inject(DB)
  private db: DbType

  async submitAnswer(s: string) {
    return s
  }
}
