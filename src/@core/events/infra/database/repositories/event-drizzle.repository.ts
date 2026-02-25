import { Injectable } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import { EventRepository } from '@/@core/events/domain/repositories/event.repository'
import { Event, EventId } from '@/@core/events/domain/entities/event.entity'
import { events, eventSections, eventSpots } from '../drizzle/schemas'
import { EventMapper } from '../drizzle/mappers/event.mapper'
import { DrizzleService } from '../drizzle/drizzle.service'

@Injectable()
export class EventDrizzleRepository implements EventRepository {
  constructor(private readonly drizzle: DrizzleService) {}

  async save(entity: Event): Promise<void> {
    const { event, sections, spots } = EventMapper.toPersistence(entity)

    await this.drizzle.db.transaction(async (tx) => {
      await tx
        .insert(events)
        .values(event)
        .onDuplicateKeyUpdate({
          set: {
            name: event.name,
            description: event.description,
            date: event.date,
            isPublished: event.isPublished,
            totalSpots: event.totalSpots,
            totalSpotsReserved: event.totalSpotsReserved,
            partnerId: event.partnerId,
          },
        })

      for (const section of sections) {
        await tx
          .insert(eventSections)
          .values(section)
          .onDuplicateKeyUpdate({
            set: {
              name: section.name,
              description: section.description,
              isPublished: section.isPublished,
              totalSpots: section.totalSpots,
              totalSpotsReserved: section.totalSpotsReserved,
              price: section.price,
            },
          })
      }

      for (const spot of spots) {
        await tx
          .insert(eventSpots)
          .values(spot)
          .onDuplicateKeyUpdate({
            set: {
              location: spot.location,
              isReserved: spot.isReserved,
              isPublished: spot.isPublished,
            },
          })
      }
    })
  }

  async findById(id: EventId): Promise<Event | null> {
    const result = await this.drizzle.db.query.events.findFirst({
      where: eq(events.id, id.value),
      with: {
        sections: {
          with: {
            spots: true,
          },
        },
      },
    })

    return result ? EventMapper.toDomain(result) : null
  }

  async findAll(): Promise<Event[]> {
    const results = await this.drizzle.db.query.events.findMany({
      with: {
        sections: {
          with: {
            spots: true,
          },
        },
      },
    })
    return results.map((row) => EventMapper.toDomain(row))
  }

  async delete(entity: Event): Promise<void> {
    await this.drizzle.db.transaction(async (tx) => {
      await tx.delete(events).where(eq(events.id, entity.id.value))
    })
  }
}
