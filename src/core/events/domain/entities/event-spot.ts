import { Entity } from '@/core/common/domain/entity'
import { Uuid } from '@/core/common/domain/value-objects/uuid.vo'

export class EventSpotId extends Uuid {}

export type EventSpotConstructorProps = {
  id?: string | EventSpotId
  location: string | null
  isReserved: boolean
  isPublished: boolean
}

export class EventSpot extends Entity<EventSpotId> {
  location: string | null
  isReserved: boolean
  isPublished: boolean

  constructor(props: EventSpotConstructorProps) {
    super()
    this.id =
      typeof props.id === 'string'
        ? new EventSpotId(props.id)
        : (props.id ?? new EventSpotId())
    this.location = props.location
    this.isReserved = props.isReserved
    this.isPublished = props.isPublished
  }

  static create() {
    return new EventSpot({
      isReserved: false,
      isPublished: false,
      location: null,
    })
  }

  changeLocation(newLocation: string) {
    this.location = newLocation
  }

  publish() {
    this.isPublished = true
  }

  unpublish() {
    this.isPublished = false
  }

  reserve() {
    this.isReserved = true
  }

  unreserve() {
    this.isReserved = false
  }

  toJson() {
    return {
      id: this.id.value,
      location: this.location,
      isReserved: this.isReserved,
      isPublished: this.isPublished,
    }
  }
}
