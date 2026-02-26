import { mysqlTable, varchar } from 'drizzle-orm/mysql-core'

export const partners = mysqlTable('partners', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
})

export type PartnerInsert = typeof partners.$inferInsert
export type PartnerSelect = typeof partners.$inferSelect
