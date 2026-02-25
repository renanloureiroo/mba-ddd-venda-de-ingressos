import { AggregateRoot } from '@/@core/common/domain/aggregate-root'
import { Cpf } from '@/@core/common/domain/value-objects/cpf.vo'
import { Uuid } from '@/@core/common/domain/value-objects/uuid.vo'

export class CostumerId extends Uuid {}

export type CustomerConstructorProps = {
  id?: string | CostumerId
  cpf: Cpf
  name: string
}

export class Customer extends AggregateRoot<CostumerId> {
  cpf: Cpf
  name: string

  constructor(props: CustomerConstructorProps) {
    super()
    this.id =
      typeof props.id === 'string'
        ? new CostumerId(props.id)
        : (props.id ?? new CostumerId())
    this.cpf = props.cpf
    this.name = props.name
  }

  static create(command: { name: string; cpf: string }) {
    return new Customer({
      name: command.name,
      cpf: new Cpf(command.cpf),
    })
  }

  toJson() {
    return {
      id: this.id.value,
      cpf: this.cpf.value,
      name: this.name,
    }
  }
}
