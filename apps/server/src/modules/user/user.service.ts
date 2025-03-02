import { Inject, Injectable, Logger } from '@nestjs/common'
import { user } from '@survey/schema'
import { eq } from 'drizzle-orm'
import { DB, DbType } from '../global/providers/db.provider'

const logger = new Logger('UserService')
@Injectable()
export class UserService {
  @Inject(DB)
  private db: DbType

  async test() {
    try {
      return await this.db.select().from(user).where(eq(user.id, 1))
    }
    catch (e) {
      logger.error(e)
    }
  }
}
