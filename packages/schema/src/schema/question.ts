import { boolean, int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core'
import { createId } from './index'

export const question = mysqlTable('question', {
  id: varchar('id', { length: 10 })
    .primaryKey()
    .$defaultFn(() => createId()),
  title: varchar({ length: 255 }).notNull(),
  isPublished: boolean('is_published').default(false),
  isStar: boolean('is_star').default(false),
  answerCount: int('answer_count').default(0),
  isDeleted: boolean('is_deleted').default(false),
  createAt: timestamp('create_at').notNull().defaultNow(), // mysql 中 timestamp 可以自动转时区，datetime 不行
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
})
