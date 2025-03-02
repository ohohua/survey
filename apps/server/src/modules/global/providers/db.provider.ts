import type { MySql2Database } from 'drizzle-orm/mysql2'
import { FactoryProvider, Logger } from '@nestjs/common'
import { SchemaType } from '@survey/schema'
import { drizzle } from 'drizzle-orm/mysql2'

export const DB = Symbol('DB_SERVICE')
export type DbType = MySql2Database<SchemaType>

export const DbProvider: FactoryProvider<DbType> = {
  provide: DB,
  useFactory: async () => {
    const logger = new Logger('DB')

    logger.debug(`Connecting to ${process.env.DATABASE_URL}`)
    logger.debug(`SECRET: ${process.env.SECRET}`)

    return drizzle(process.env.DATABASE_URL!)
  },
}
