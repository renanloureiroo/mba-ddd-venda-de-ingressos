import { EventSection } from '@/core/events/domain/entities/event-section'
import { EventSectionItemListOutputDTO } from './dtos/event-section-item-list-output.dto'

export class EventSectionPresenter {
  static toHttp(event: EventSection): EventSectionItemListOutputDTO {
    return {
      id: event.id.value,
      name: event.name,
      price: event.price,
      totalSpots: event.totalSpots,
      totalSpotsReserved: event.totalSpotsReserved,
    }
  }

  static toHttpList(
    eventSections: EventSection[],
  ): EventSectionItemListOutputDTO[] {
    return eventSections.map((eventSection) => this.toHttp(eventSection))
  }
}
