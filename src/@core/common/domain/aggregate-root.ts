import { Entity } from './entity'

export abstract class AggregateRoot<ID = unknown> extends Entity<ID> {}
