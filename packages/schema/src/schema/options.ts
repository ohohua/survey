import { mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core'
import { createId } from './index'

export const options = mysqlTable('options', {
  id: varchar('id', { length: 10 })
    .primaryKey()
    .$defaultFn(() => createId()),

  questionId: varchar('question_id', { length: 10 }).notNull(),
  componentId: varchar('component_id', { length: 10 }).notNull(),
  option: varchar('option', { length: 255 }),
  createAt: timestamp('create_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
})
