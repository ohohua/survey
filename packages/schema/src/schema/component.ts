import { boolean, int, json, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core'
import { createId } from './index'

export const component = mysqlTable('component', {
  id: varchar('id', { length: 10 })
    .primaryKey()
    .$defaultFn(() => createId()),
  questionId: varchar('question_id', { length: 10 }).notNull(),
  type: varchar('type', { length: 64 }),
  sort: int('sort').notNull(),
  props: json('json').default('{}'),
  isDeleted: boolean('is_deleted').default(false),
  createAt: timestamp('create_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
})
