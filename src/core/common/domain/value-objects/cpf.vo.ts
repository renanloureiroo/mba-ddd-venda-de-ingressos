import { ValueObject } from './value-object'
import { CpfValidator } from '../validators/cpf.validator'

export class Cpf extends ValueObject<string> {
  constructor(value: string) {
    super(value.replace(/\D/g, ''))
    this.validade()
  }

  private validade() {
    if (this.value.length !== 11) {
      throw new InvalidCpfError(
        `CPF must have 11 digits, but has ${this.value.length} digits`,
      )
    }

    if (!CpfValidator.validate(this.value)) {
      throw new InvalidCpfError('CPF is invalid')
    }
  }
}

export class InvalidCpfError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidCpfError'
  }
}
