import { mysqlTable, varchar } from 'drizzle-orm/mysql-core'
import { createId } from './index'

export const answer = mysqlTable('answer', {
  id: varchar('id', { length: 10 })
    .primaryKey()
    .$defaultFn(() => createId()),

  userId: varchar('user_id', { length: 10 }).notNull(),
  componentId: varchar('component_id', { length: 10 }).notNull(),
  content: varchar('content', { length: 255 }),
})
