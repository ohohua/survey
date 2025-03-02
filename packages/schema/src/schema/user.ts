import { int, mysqlTable, text, varchar } from 'drizzle-orm/mysql-core'
import { createId } from './index'

export const user = mysqlTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar({ length: 255 }).notNull(),
  age: int().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
})
