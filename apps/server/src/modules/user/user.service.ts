import { Inject, Injectable, Logger } from '@nestjs/common'
import { usersTable } from '@survey/schema'
import { eq } from 'drizzle-orm'
import { DB, DbType } from '../global/providers/db.provider'

const logger = new Logger('UserService')
@Injectable()
export class UserService {
  @Inject(DB)
  private db: DbType

  async test() {
    try {
      return await this.db.select().from(usersTable).where(eq(usersTable.id, 1))
    }
    catch (e) {
      logger.error(e)
    }
  }
}
