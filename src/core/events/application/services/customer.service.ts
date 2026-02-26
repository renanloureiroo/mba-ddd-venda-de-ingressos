import { Injectable } from '@nestjs/common'
import { CustomerRepository } from '../../domain/repositories/customer.repository'
import { RegisterCustomerInputDTO } from '../dtos/register-customer-input.dto'
import { Customer } from '../../domain/entities/customer.entity'
import { CustomerAlreadyExistsError } from '../errors/customer-already-exists.error'
import { Cpf } from '@/core/common/domain/value-objects/cpf.vo'

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async list(): Promise<Customer[]> {
    return this.customerRepository.findAll()
  }

  async register(input: RegisterCustomerInputDTO): Promise<void> {
    const customerAlreadyExists = await this.customerRepository.findByCpf(
      new Cpf(input.cpf),
    )

    if (customerAlreadyExists) {
      throw new CustomerAlreadyExistsError(input.cpf)
    }

    const customer = Customer.create({ name: input.name, cpf: input.cpf })
    await this.customerRepository.save(customer)
  }
}
