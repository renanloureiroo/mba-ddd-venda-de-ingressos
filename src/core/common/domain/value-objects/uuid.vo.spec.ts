import { Uuid, InvalidUuidError } from './uuid.vo'

describe('ValueObject: Uuid', () => {
  it('deve criar um UUID válido gerado automaticamente', () => {
    const uuid = new Uuid()
    expect(uuid).toBeInstanceOf(Uuid)
    expect(uuid.value).toBeDefined()
    expect(uuid.value).toHaveLength(36)
  })

  it('deve criar um UUID válido passado no construtor', () => {
    const validUuid = '550e8400-e29b-41d4-a716-446655440000'
    const uuid = new Uuid(validUuid)
    expect(uuid).toBeInstanceOf(Uuid)
    expect(uuid.value).toBe(validUuid)
  })

  it('deve lançar erro ao passar um UUID inválido', () => {
    expect(() => new Uuid('invalid-uuid')).toThrow(InvalidUuidError)
    expect(() => new Uuid('123')).toThrow(InvalidUuidError)
  })
})
