import {
  Cpf,
  InvalidCpfError,
} from 'src/@core/common/domain/value-objects/cpf.vo'
import { CostumerId, Customer } from './customer.entity'

describe('Aggregate: Costumer', () => {
  it('deve criar um costumer corretamente', () => {
    const costumer = Customer.create({
      name: 'John Doe',
      cpf: '623.126.270-78',
    })

    expect(costumer).toBeInstanceOf(Customer)
    expect(costumer.name).toBe('John Doe')
    expect(costumer.cpf.value.toString()).toBe('62312627078')
  })

  it('deve criar um costumer criando um id quando não passado no construtor', () => {
    const costumer = Customer.create({
      name: 'John Doe',
      cpf: '623.126.270-78',
    })

    expect(costumer).toBeInstanceOf(Customer)
    expect(costumer.id).toBeInstanceOf(CostumerId)
  })

  it('deve criar um costumer passando um id no construtor', () => {
    const costumer = new Customer({
      id: 'c1d0d8d1-86c0-4257-bb9c-57550f83c1e2',
      cpf: new Cpf('623.126.270-78'),
      name: 'John Doe',
    })
    expect(costumer).toBeInstanceOf(Customer)
    expect(costumer.id).toBeInstanceOf(CostumerId)
  })

  it('deve lançar uma erro ao criar um costumer com um CPF inválido', () => {
    expect(() => {
      Customer.create({
        name: 'John Doe',
        cpf: '11111111111',
      })
    }).toThrow(InvalidCpfError)
  })
})
