import { Injectable } from '@nestjs/common'
import { CustomerRepository } from '../../domain/repositories/customer.repository'
import { RegisterCustomerInputDTO } from '../dtos/register-customer-input.dto'
import { Customer } from '../../domain/entities/customer.entity'

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async list(): Promise<Customer[]> {
    return this.customerRepository.findAll()
  }

  async register(input: RegisterCustomerInputDTO): Promise<void> {
    const customer = Customer.create({ name: input.name, cpf: input.cpf })
    await this.customerRepository.save(customer)
  }
}
