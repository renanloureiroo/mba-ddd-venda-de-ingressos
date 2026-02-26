import { isDeepStrictEqual } from 'node:util'

export abstract class Entity<ID = unknown> {
  id: ID

  abstract toJson(): unknown

  equals(obj: this): boolean {
    if (obj === null || obj === undefined) return false

    if (obj.id === undefined) return false

    if (obj.constructor.name !== this.constructor.name) return false

    return isDeepStrictEqual(this.id, obj.id)
  }
}
