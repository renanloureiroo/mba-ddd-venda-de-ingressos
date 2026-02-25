import { AggregateRoot } from '@/@core/common/domain/aggregate-root'
import { PartnerId } from './partner.entity'
import { Uuid } from '@/@core/common/domain/value-objects/uuid.vo'
import { EventSection } from './event-section'

export class EventId extends Uuid {}

export type CreateEventCommand = {
  name: string
  description?: string | null
  date: Date
  partnerId: PartnerId
}
export type AddSectionCommand = {
  name: string
  description?: string | null
  totalSpots: number
  price: number
}

export type EventConstructorProps = {
  id?: string | EventId
  name: string
  description?: string | null
  date: Date
  isPublished: boolean

  totalSpots: number
  totalSpotsReserved: number
  partnerId: PartnerId | string
  sections?: Set<EventSection>
}

export class Event extends AggregateRoot<EventId> {
  name: string
  description: string | null
  date: Date
  isPublished: boolean

  totalSpots: number
  totalSpotsReserved: number
  partnerId: PartnerId
  sections: Set<EventSection>

  constructor(props: EventConstructorProps) {
    super()
    this.id =
      typeof props.id === 'string'
        ? new EventId(props.id)
        : (props.id ?? new EventId())
    this.name = props.name
    this.description = props?.description ?? null
    this.date = props.date
    this.isPublished = props.isPublished
    this.totalSpots = props.totalSpots
    this.totalSpotsReserved = props.totalSpotsReserved
    this.partnerId =
      typeof props.partnerId === 'string'
        ? new PartnerId(props.partnerId)
        : props.partnerId
    this.sections = props?.sections ?? new Set<EventSection>()
  }

  static create(command: CreateEventCommand) {
    return new Event({
      name: command.name,
      description: command.description,
      date: command.date,
      partnerId: command.partnerId,
      isPublished: false,
      totalSpots: 0,
      totalSpotsReserved: 0,
    })
  }

  changeName(name: string) {
    this.name = name
  }

  changeDescription(description: string | null) {
    this.description = description
  }

  changeDate(date: Date) {
    this.date = date
  }

  publishAll() {
    this.publish()
    this.sections.forEach((section) => section.publishAll())
  }

  unpublishAll() {
    this.unpublish()
    this.sections.forEach((section) => section.unpublishAll())
  }

  publish() {
    this.isPublished = true
  }

  unpublish() {
    this.isPublished = false
  }

  addSection(command: AddSectionCommand) {
    const section = EventSection.create(command)
    this.sections.add(section)
    this.totalSpots += section.totalSpots
  }

  toJson() {
    return {
      id: this.id.value,
      name: this.name,
      description: this.description,
      date: this.date,
      isPublished: this.isPublished,
      totalSpots: this.totalSpots,
      totalSpotsReserved: this.totalSpotsReserved,
      partnerId: this.partnerId.value,
      sections: [...this.sections].map((section) => section.toJson()),
    }
  }
}
