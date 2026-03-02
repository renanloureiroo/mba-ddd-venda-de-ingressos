import { Customer } from '@/core/events/domain/entities/customer.entity'
import { CostumerItemListOutputDTO } from './dtos/costumer-item-list-output.dto'

export class CustomerPresenter {
  static toHttp(customer: Customer): CostumerItemListOutputDTO {
    return {
      id: customer.id.value,
      name: customer.name,
    }
  }

  static toHttpList(customers: Customer[]): CostumerItemListOutputDTO[] {
    return customers.map((customer) => this.toHttp(customer))
  }
}
