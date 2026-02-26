import { Injectable } from '@nestjs/common'

import { eq } from 'drizzle-orm'
import { PartnerRepository } from '@/core/events/domain/repositories/partner.repository'
import {
  Partner,
  PartnerId,
} from '@/core/events/domain/entities/partner.entity'
import { partners } from '../drizzle/schemas'
import { PartnerMapper } from '../drizzle/mappers/partner.mapper'
import { DrizzleService } from '../drizzle/drizzle.service'

@Injectable()
export class PartnerDrizzleRepository implements PartnerRepository {
  constructor(private readonly drizzle: DrizzleService) {}

  async save(entity: Partner): Promise<void> {
    const data = PartnerMapper.toPersistence(entity)
    await this.drizzle.db
      .insert(partners)
      .values(data)
      .onDuplicateKeyUpdate({
        set: {
          name: data.name,
        },
      })
  }

  async findById(id: PartnerId): Promise<Partner | null> {
    const result = await this.drizzle.db.query.partners.findFirst({
      where: eq(partners.id, id.value),
    })

    return result ? PartnerMapper.toDomain(result) : null
  }

  async findAll(): Promise<Partner[]> {
    const results = await this.drizzle.db.select().from(partners)
    return results.map((row) => PartnerMapper.toDomain(row))
  }

  async delete(entity: Partner): Promise<void> {
    await this.drizzle.db
      .delete(partners)
      .where(eq(partners.id, entity.id.value))
  }
}
