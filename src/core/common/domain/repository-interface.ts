import { AggregateRoot } from './aggregate-root'

export interface IRepository<E extends AggregateRoot<any>> {
  save(entity: E): Promise<void>
  findById(id: any): Promise<E | null>
  findAll(): Promise<E[]>
  delete(id: E): Promise<void>
}
