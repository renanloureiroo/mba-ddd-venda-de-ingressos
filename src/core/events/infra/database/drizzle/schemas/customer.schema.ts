import { mysqlTable, varchar } from 'drizzle-orm/mysql-core'

export const customers = mysqlTable('customers', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  cpf: varchar('cpf', { length: 11 }).notNull(),
})

export type CustomerInsert = typeof customers.$inferInsert
export type CustomerSelect = typeof customers.$inferSelect
