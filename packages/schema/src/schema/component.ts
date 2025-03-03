import { json, mysqlEnum, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core'
import { createId } from './index'

export const component = mysqlTable('component', {
  id: varchar('id', { length: 10 })
    .primaryKey()
    .$defaultFn(() => createId()),
  questionId: varchar('question_id', { length: 10 }).notNull(),
  type: mysqlEnum(['questionTitle', 'questionInput']),
  title: varchar({ length: 64 }).notNull(),
  props: json(),
  createAt: timestamp('create_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
})
