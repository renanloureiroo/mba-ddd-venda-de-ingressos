import { Event } from '@/core/events/domain/entities/event.entity'
import { EventOutputDTO } from './dtos/event-output.dto'

export class EventPresenter {
  static toHttp(event: Event): EventOutputDTO {
    return {
      id: event.id.value,
      name: event.name,
      description: event?.description,
      date: event.date,
    }
  }

  static toHttpList(events: Event[]): EventOutputDTO[] {
    return events.map((event) => this.toHttp(event))
  }
}
