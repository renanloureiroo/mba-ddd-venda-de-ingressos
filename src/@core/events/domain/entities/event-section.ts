import { Entity } from 'src/@core/common/domain/entity'
import { Uuid } from 'src/@core/common/domain/value-objects/uuid.vo'
import { EventSpot } from './event-spot'

export class EventSectionId extends Uuid {}

export type EventSectionCreateCommand = {
  name: string
  description?: string | null
  totalSpots: number
  price: number
}

export type EventSectionProps = {
  id?: EventSectionId | string
  name: string
  description?: string | null
  isPublished: boolean
  totalSpots: number
  totalSpotsReserved: number
  price: number
  spots?: Set<EventSpot>
}

export class EventSection extends Entity<EventSectionId> {
  name: string
  description: string | null
  isPublished: boolean
  totalSpots: number
  totalSpotsReserved: number
  price: number
  spots: Set<EventSpot>

  constructor(props: EventSectionProps) {
    super()
    this.id =
      typeof props.id === 'string'
        ? new EventSectionId(props.id)
        : (props.id ?? new EventSectionId())
    this.name = props.name
    this.description = props.description ?? null
    this.isPublished = props.isPublished
    this.totalSpots = props.totalSpots
    this.totalSpotsReserved = props.totalSpotsReserved
    this.price = props.price
    this.spots = props.spots ?? new Set<EventSpot>()
  }

  static create(command: EventSectionCreateCommand) {
    const section = new EventSection({
      ...command,
      description: command.description,
      totalSpots: command.totalSpots,
      price: command.price,
      isPublished: false,
      totalSpotsReserved: 0,
    })

    section.initSpots()
    return section
  }

  changePrice(newPrice: number) {
    this.price = newPrice
  }

  publishAll() {
    this.publish()
    this.spots.forEach((spot) => spot.publish())
  }

  unpublishAll() {
    this.unpublish()
    this.spots.forEach((spot) => spot.unpublish())
  }

  publish() {
    this.isPublished = true
  }

  unpublish() {
    this.isPublished = false
  }

  toJson() {
    return {
      id: this.id.value,
      name: this.name,
      description: this.description,
      isPublished: this.isPublished,
      totalSpots: this.totalSpots,
      totalSpotsReserved: this.totalSpotsReserved,
      price: this.price,
      spots: [...this.spots].map((spot) => spot.toJson()),
    }
  }

  addSpot(spot: EventSpot) {
    this.spots.add(spot)
  }

  private initSpots() {
    for (let spotIndex = 0; spotIndex < this.totalSpots; spotIndex++) {
      this.addSpot(EventSpot.create())
    }
  }
}
