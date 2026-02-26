import { CustomerRepository } from '../../domain/repositories/customer.repository'
import { InMemoryCustomerRepository } from 'test/repositories/in-memory-customer.respository'
import { CustomerService } from './customer.service'
import { CustomerAlreadyExistsError } from '../errors/customer-already-exists.error'
import { InvalidCpfError } from '@/core/common/domain/value-objects/cpf.vo'

const CUSTOMER_CPF = '57192911054'
const CUSTOMER_NAME = 'John Doe'

describe('Customer Service  Unit Spec', () => {
  let sut: CustomerService
  let repository: CustomerRepository

  beforeEach(async () => {
    repository = new InMemoryCustomerRepository()
    sut = new CustomerService(repository)
  })

  describe('Register Customer', () => {
    it('deve criar um novo Customer', async () => {
      await sut.register({
        name: CUSTOMER_NAME,
        cpf: CUSTOMER_CPF,
      })

      const customers = await repository.findAll()

      expect(customers).toHaveLength(1)
      expect(customers[0].name).toBe(CUSTOMER_NAME)
      expect(customers[0].cpf.value).toBe(CUSTOMER_CPF)
    })

    it('não deve ser possível cadastrar um customer com cpf duplicado', async () => {
      await sut.register({
        name: CUSTOMER_NAME,
        cpf: CUSTOMER_CPF,
      })

      await expect(
        sut.register({
          name: 'John Doe 2 ',
          cpf: CUSTOMER_CPF,
        }),
      ).rejects.toThrow(CustomerAlreadyExistsError)
    })

    it.each([
      { name: 'John Doe', cpf: '123' },
      { name: 'John Doe', cpf: '11111111111' },
      { name: 'John Doe', cpf: '12345678901' },
    ])(
      'não deve ser possível cadastrar um customer com cpf inválido',
      async ({ name, cpf }) => {
        await expect(
          sut.register({
            name,
            cpf,
          }),
        ).rejects.toThrow(InvalidCpfError)
      },
    )
  })

  describe('List Customers', () => {
    it('deve retornar uma lista de customers', async () => {
      await sut.register({
        name: CUSTOMER_NAME,
        cpf: CUSTOMER_CPF,
      })

      const customers = await sut.list()

      expect(customers).toHaveLength(1)
    })

    it('deve retornar uma lista vazia quando não houver customers', async () => {
      const customers = await sut.list()

      expect(customers).toHaveLength(0)
    })
  })
})
