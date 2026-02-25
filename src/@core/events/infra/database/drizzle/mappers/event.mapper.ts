import { Event, EventId } from '@/@core/events/domain/entities/event.entity'
import {
  EventSection,
  EventSectionId,
} from '@/@core/events/domain/entities/event-section'
import {
  EventSpot,
  EventSpotId,
} from '@/@core/events/domain/entities/event-spot'
import type {
  EventSelect,
  EventSectionSelect,
  EventSpotSelect,
  EventInsert,
  EventSectionInsert,
  EventSpotInsert,
} from '../schemas'

export class EventMapper {
  static toDomain(
    rawEvent: EventSelect & {
      sections: (EventSectionSelect & { spots: EventSpotSelect[] })[]
    },
  ): Event {
    const sections = new Set<EventSection>()

    if (rawEvent.sections) {
      for (const sectionRaw of rawEvent.sections) {
        const spots = new Set<EventSpot>()
        for (const spotRaw of sectionRaw.spots) {
          spots.add(
            new EventSpot({
              id: new EventSpotId(spotRaw.id),
              location: spotRaw.location,
              isReserved: spotRaw.isReserved,
              isPublished: spotRaw.isPublished,
            }),
          )
        }

        sections.add(
          new EventSection({
            id: new EventSectionId(sectionRaw.id),
            name: sectionRaw.name,
            description: sectionRaw.description,
            isPublished: sectionRaw.isPublished,
            totalSpots: sectionRaw.totalSpots,
            totalSpotsReserved: sectionRaw.totalSpotsReserved,
            price: Number(sectionRaw.price),
            spots,
          }),
        )
      }
    }

    return new Event({
      id: new EventId(rawEvent.id),
      name: rawEvent.name,
      description: rawEvent.description,
      date: rawEvent.date,
      isPublished: rawEvent.isPublished,
      totalSpots: rawEvent.totalSpots,
      totalSpotsReserved: rawEvent.totalSpotsReserved,
      partnerId: rawEvent.partnerId,
      sections,
    })
  }

  static toPersistence(event: Event) {
    const sections = Array.from(event.sections)
    const allSpots: EventSpotInsert[] = []
    const allSections: EventSectionInsert[] = []

    for (const section of sections) {
      allSections.push({
        id: section.id.value,
        name: section.name,
        description: section.description,
        isPublished: section.isPublished,
        totalSpots: section.totalSpots,
        totalSpotsReserved: section.totalSpotsReserved,
        price: section.price.toString(),
        eventId: event.id.value,
      })

      for (const spot of section.spots) {
        allSpots.push({
          id: spot.id.value,
          location: spot.location,
          isReserved: spot.isReserved,
          isPublished: spot.isPublished,
          sectionId: section.id.value,
        })
      }
    }

    return {
      event: {
        id: event.id.value,
        name: event.name,
        description: event.description,
        date: event.date,
        isPublished: event.isPublished,
        totalSpots: event.totalSpots,
        totalSpotsReserved: event.totalSpotsReserved,
        partnerId: event.partnerId.value,
      } as EventInsert,
      sections: allSections,
      spots: allSpots,
    }
  }
}
