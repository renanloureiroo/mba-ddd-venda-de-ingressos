import { randomUUID } from 'node:crypto'
import { ValueObject } from './value-object'

export class Uuid extends ValueObject<string> {
  constructor(id?: string) {
    super(id ?? randomUUID())
    this.validate()
  }

  private validate() {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

    if (!uuidRegex.test(this.value)) {
      throw new InvalidUuidError('Invalid UUID')
    }
  }
}

export class InvalidUuidError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidUuidError'
  }
}
