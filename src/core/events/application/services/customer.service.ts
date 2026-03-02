import { Injectable, Logger } from '@nestjs/common'
import { CustomerRepository } from '../../domain/repositories/customer.repository'
import { RegisterCustomerInputDTO } from '../dtos/register-customer-input.dto'
import { Customer, CustomerId } from '../../domain/entities/customer.entity'
import { CustomerAlreadyExistsError } from '../errors/customer-already-exists.error'
import { Cpf } from '@/core/common/domain/value-objects/cpf.vo'
import { UnitOfWork } from '@/core/common/application/unit-of-work.interface'
import { UpdateCustomerInputDTO } from '../dtos/update-customer-input.dto'
import { CustomerNotFoundError } from '../errors/customer-not-found.error'

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name)

  constructor(
    private readonly uow: UnitOfWork,
    private readonly customerRepository: CustomerRepository,
  ) {}

  async list(): Promise<Customer[]> {
    this.logger.debug('Listando todos os clientes')
    return this.customerRepository.findAll()
  }

  async register(input: RegisterCustomerInputDTO): Promise<void> {
    this.logger.log(`Iniciando registro do cliente com CPF ${input.cpf}`)

    const customerAlreadyExists = await this.customerRepository.findByCpf(
      new Cpf(input.cpf),
    )

    if (customerAlreadyExists) {
      this.logger.warn(
        `Tentativa de cadastro rejeitada: O CPF ${input.cpf} já existe na base`,
      )
      throw new CustomerAlreadyExistsError(input.cpf)
    }

    const customer = Customer.create({ name: input.name, cpf: input.cpf })
    this.logger.debug('Salvando entidade cliente no repositório')
    await this.customerRepository.save(customer)

    await this.uow.commit()
    this.logger.log(`Cliente ${customer.id.value} registrado com sucesso`)
  }

  async update(id: string, input: UpdateCustomerInputDTO): Promise<void> {
    this.logger.log(`Iniciando atualização do cliente com ID ${id}`)

    const customer = await this.customerRepository.findById(new CustomerId(id))

    if (!customer) {
      this.logger.warn(
        `Tentativa de atualização rejeitada: O cliente com ID ${id} não existe na base`,
      )
      throw new CustomerNotFoundError(id)
    }

    if (input?.name) {
      customer.changeName(input.name)
    }

    await this.customerRepository.save(customer)

    await this.uow.commit()
    this.logger.log(`Cliente ${customer.id.value} atualizado com sucesso`)
  }
}
