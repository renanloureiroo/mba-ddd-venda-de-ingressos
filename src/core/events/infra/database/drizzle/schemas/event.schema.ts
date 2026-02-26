import {
  boolean,
  int,
  mysqlTable,
  timestamp,
  varchar,
  text,
  decimal,
} from 'drizzle-orm/mysql-core'
import { relations } from 'drizzle-orm'
import { partners } from './partner.schema'

export const events = mysqlTable('events', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  date: timestamp('date').notNull(),
  isPublished: boolean('is_published').notNull().default(false),
  totalSpots: int('total_spots').notNull().default(0),
  totalSpotsReserved: int('total_spots_reserved').notNull().default(0),
  partnerId: varchar('partner_id', { length: 36 })
    .notNull()
    .references(() => partners.id),
})

export const eventsRelations = relations(events, ({ many }) => ({
  sections: many(eventSections),
}))

export type EventInsert = typeof events.$inferInsert
export type EventSelect = typeof events.$inferSelect

export const eventSections = mysqlTable('event_sections', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  isPublished: boolean('is_published').notNull().default(false),
  totalSpots: int('total_spots').notNull().default(0),
  totalSpotsReserved: int('total_spots_reserved').notNull().default(0),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  eventId: varchar('event_id', { length: 36 })
    .notNull()
    .references(() => events.id, { onDelete: 'cascade' }),
})

export const eventSectionsRelations = relations(
  eventSections,
  ({ one, many }) => ({
    event: one(events, {
      fields: [eventSections.eventId],
      references: [events.id],
    }),
    spots: many(eventSpots),
  }),
)

export type EventSectionInsert = typeof eventSections.$inferInsert
export type EventSectionSelect = typeof eventSections.$inferSelect

export const eventSpots = mysqlTable('event_spots', {
  id: varchar('id', { length: 36 }).primaryKey(),
  location: varchar('location', { length: 255 }),
  isReserved: boolean('is_reserved').notNull().default(false),
  isPublished: boolean('is_published').notNull().default(false),
  sectionId: varchar('section_id', { length: 36 })
    .notNull()
    .references(() => eventSections.id, { onDelete: 'cascade' }),
})

export const eventSpotsRelations = relations(eventSpots, ({ one }) => ({
  section: one(eventSections, {
    fields: [eventSpots.sectionId],
    references: [eventSections.id],
  }),
}))

export type EventSpotInsert = typeof eventSpots.$inferInsert
export type EventSpotSelect = typeof eventSpots.$inferSelect
