import { IRepository } from '@/core/common/domain/repository-interface'
import { Event, EventId } from '../entities/event.entity'

export abstract class EventRepository implements IRepository<Event> {
  abstract save(entity: Event): Promise<void>
  abstract findById(id: EventId): Promise<Event | null>
  abstract findAll(): Promise<Event[]>
  abstract delete(entity: Event): Promise<void>
}
