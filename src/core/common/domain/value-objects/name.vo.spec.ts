import { Name } from './name.vo'

describe('Value Object: Name', () => {
  it('deve criar um nome a partir da classe correta', () => {
    const name = new Name('John Doe')
    expect(name).toBeInstanceOf(Name)
  })

  it('deve criar um nome com valor correto', () => {
    const name = new Name('John Doe')
    expect(name.value).toBe('John Doe')
  })
})
