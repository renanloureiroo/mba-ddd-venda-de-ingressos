import { Injectable } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import {
  Customer,
  CustomerId,
} from '@/core/events/domain/entities/customer.entity'
import { CustomerRepository } from '@/core/events/domain/repositories/customer.repository'
import { CustomerMapper } from '../drizzle/mappers/customer.mapper'
import { customers } from '../drizzle/schemas/customer.schema'
import { DrizzleService } from '../drizzle/drizzle.service'

@Injectable()
export class CustomerDrizzleRepository implements CustomerRepository {
  constructor(private readonly drizzle: DrizzleService) {}

  async save(entity: Customer): Promise<void> {
    const data = CustomerMapper.toPersistence(entity)
    await this.drizzle.db
      .insert(customers)
      .values(data)
      .onDuplicateKeyUpdate({
        set: {
          name: data.name,
          cpf: data.cpf,
        },
      })
  }

  async findById(id: CustomerId): Promise<Customer | null> {
    const [row] = await this.drizzle.db
      .select()
      .from(customers)
      .where(eq(customers.id, id.value))

    return row ? CustomerMapper.toDomain(row) : null
  }

  async findAll(): Promise<Customer[]> {
    const rows = await this.drizzle.db.select().from(customers)
    return rows.map((row) => CustomerMapper.toDomain(row))
  }

  async delete(entity: Customer): Promise<void> {
    await this.drizzle.db
      .delete(customers)
      .where(eq(customers.id, entity.id.value))
  }
}
