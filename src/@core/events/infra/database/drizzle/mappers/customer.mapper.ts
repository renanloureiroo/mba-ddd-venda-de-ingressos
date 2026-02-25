import {
  Customer,
  CustomerId,
} from '@/@core/events/domain/entities/customer.entity'
import { Cpf } from '@/@core/common/domain/value-objects/cpf.vo'
import type { CustomerSelect, CustomerInsert } from '../schemas'

export class CustomerMapper {
  static toDomain(raw: CustomerSelect): Customer {
    return new Customer({
      id: new CustomerId(raw.id),
      name: raw.name,
      cpf: new Cpf(raw.cpf),
    })
  }

  static toPersistence(customer: Customer): CustomerInsert {
    return {
      id: customer.id.value,
      name: customer.name,
      cpf: customer.cpf.value,
    }
  }
}
