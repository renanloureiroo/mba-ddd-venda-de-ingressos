import { IRepository } from '@/@core/common/domain/repository-interface'
import { Customer, CustomerId } from '../entities/customer.entity'

export abstract class CustomerRepository implements IRepository<Customer> {
  abstract save(entity: Customer): Promise<void>
  abstract findById(id: CustomerId): Promise<Customer | null>
  abstract findAll(): Promise<Customer[]>
  abstract delete(entity: Customer): Promise<void>
}
