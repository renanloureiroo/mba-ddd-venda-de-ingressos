import {
  Cpf,
  InvalidCpfError,
} from '@/@core/common/domain/value-objects/cpf.vo'
import { CustomerId, Customer } from './customer.entity'

describe('Aggregate: Customer', () => {
  it('deve criar um customer corretamente', () => {
    const customer = Customer.create({
      name: 'John Doe',
      cpf: '623.126.270-78',
    })

    expect(customer).toBeInstanceOf(Customer)
    expect(customer.name).toBe('John Doe')
    expect(customer.cpf.value.toString()).toBe('62312627078')
  })

  it('deve criar um customer criando um id quando não passado no construtor', () => {
    const customer = Customer.create({
      name: 'John Doe',
      cpf: '623.126.270-78',
    })

    expect(customer).toBeInstanceOf(Customer)
    expect(customer.id).toBeInstanceOf(CustomerId)
  })

  it('deve criar um customer passando um id no construtor', () => {
    const customer = new Customer({
      id: 'c1d0d8d1-86c0-4257-bb9c-57550f83c1e2',
      cpf: new Cpf('623.126.270-78'),
      name: 'John Doe',
    })
    expect(customer).toBeInstanceOf(Customer)
    expect(customer.id).toBeInstanceOf(CustomerId)
  })

  it('deve lançar uma erro ao criar um customer com um CPF inválido', () => {
    expect(() => {
      Customer.create({
        name: 'John Doe',
        cpf: '11111111111',
      })
    }).toThrow(InvalidCpfError)
  })
})
