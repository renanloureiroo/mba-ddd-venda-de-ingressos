import { Cpf, InvalidCpfError } from './cpf.vo'

describe('ValueObject: Cpf', () => {
  it('deve criar um CPF válido', () => {
    const cpf = new Cpf('123.456.789-09')
    expect(cpf).toBeInstanceOf(Cpf)
    expect(cpf.value).toBe('12345678909')
  })

  it('deve lançar erro se o CPF não tiver 11 dígitos', () => {
    expect(() => new Cpf('123456789')).toThrow(InvalidCpfError)
    expect(() => new Cpf('123456789012')).toThrow(InvalidCpfError)
  })

  it('deve lançar erro se todos os dígitos forem iguais', () => {
    expect(() => new Cpf('111.111.111-11')).toThrow(InvalidCpfError)
    expect(() => new Cpf('00000000000')).toThrow(InvalidCpfError)
  })

  it('deve lançar erro se os dígitos verificadores estiverem errados', () => {
    expect(() => new Cpf('12345678901')).toThrow(InvalidCpfError)
  })
})
