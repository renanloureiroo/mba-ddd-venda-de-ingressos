import { AggregateRoot } from '@/@core/common/domain/aggregate-root'
import { Uuid } from '@/@core/common/domain/value-objects/uuid.vo'
import { Event } from './event.entity'

export class PartnerId extends Uuid {}

type InitEventCommand = {
  name: string
  description?: string | null
  date: Date
}

export type PartnerConstructorProps = {
  id?: string | PartnerId
  name: string
}

export class Partner extends AggregateRoot<PartnerId> {
  name: string

  constructor(props: PartnerConstructorProps) {
    super()
    this.id =
      typeof props.id === 'string'
        ? new PartnerId(props.id)
        : (props.id ?? new PartnerId())
    this.name = props.name
  }

  static create(command: { name: string; email: string }) {
    return new Partner({
      name: command.name,
    })
  }

  initEvent(command: InitEventCommand) {
    return Event.create({
      ...command,
      partnerId: this.id,
    })
  }

  toJson() {
    return {
      id: this.id.value,
      name: this.name,
    }
  }
}
