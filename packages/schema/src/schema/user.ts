import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core'
import { createId } from './index'

export const user = mysqlTable('user', {
  id: varchar('id', { length: 10 })
    .primaryKey()
    .$defaultFn(() => createId()),
  username: varchar({ length: 20 }).notNull().unique(),
  password: varchar({ length: 20 }).notNull(),
  name: varchar({ length: 64 }).notNull(),
  age: int().notNull(),
  email: varchar({ length: 64 }).notNull().unique(),
  createAt: timestamp('create_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
})
