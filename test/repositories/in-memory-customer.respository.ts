import { Cpf } from '@/core/common/domain/value-objects/cpf.vo'
import {
  Customer,
  CustomerId,
} from '@/core/events/domain/entities/customer.entity'
import { CustomerRepository } from '@/core/events/domain/repositories/customer.repository'

export class InMemoryCustomerRepository implements CustomerRepository {
  public customers: Customer[] = []

  constructor() {
    this.customers = []
  }

  async save(entity: Customer): Promise<void> {
    this.customers.push(entity)
  }

  async findById(id: CustomerId): Promise<Customer | null> {
    return this.customers.find((customer) => customer.id === id) ?? null
  }

  async findByCpf(cpf: Cpf): Promise<Customer | null> {
    return this.customers.find((customer) => customer.cpf.equals(cpf)) ?? null
  }

  async findAll(): Promise<Customer[]> {
    return this.customers
  }

  async delete(entity: Customer): Promise<void> {
    this.customers = this.customers.filter(
      (customer) => customer.id !== entity.id,
    )
  }
}
