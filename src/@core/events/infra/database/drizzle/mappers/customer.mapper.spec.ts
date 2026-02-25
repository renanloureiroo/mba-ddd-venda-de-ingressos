import { Customer } from '@/@core/events/domain/entities/customer.entity'
import { CustomerMapper } from './customer.mapper'

describe('CustomerMapper', () => {
  describe('toDomain', () => {
    it('deve converter um registro do banco para a entidade Customer', () => {
      const raw = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'John Doe',
        cpf: '12345678901',
      }

      const customer = CustomerMapper.toDomain(raw)

      expect(customer).toBeInstanceOf(Customer)
      expect(customer.id.value).toBe(raw.id)
      expect(customer.name).toBe(raw.name)
      expect(customer.cpf.value).toBe(raw.cpf)
    })
  })

  describe('toPersistence', () => {
    it('deve converter a entidade Customer para o formato do banco', () => {
      const customer = Customer.create({
        name: 'John Doe',
        cpf: '123.456.789-01',
      })

      const persistence = CustomerMapper.toPersistence(customer)

      expect(persistence).toEqual({
        id: customer.id.value,
        name: 'John Doe',
        cpf: '12345678901',
      })
    })
  })

  describe('roundtrip', () => {
    it('deve manter os dados intactos após toDomain → toPersistence', () => {
      const raw = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'John Doe',
        cpf: '12345678901',
      }

      const customer = CustomerMapper.toDomain(raw)
      const persistence = CustomerMapper.toPersistence(customer)

      expect(persistence).toEqual(raw)
    })
  })
})
