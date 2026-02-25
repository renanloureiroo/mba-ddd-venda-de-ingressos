import { Injectable } from '@nestjs/common'

import { DrizzleService } from '../drizzle.service'
import { partners } from '../schemas/partner.schema'
import { PartnerMapper } from '../mappers/partner.mapper'
import { eq } from 'drizzle-orm'
import { PartnerRepository } from '@/@core/events/domain/repositories/partner.repository'
import {
  Partner,
  PartnerId,
} from '@/@core/events/domain/entities/partner.entity'

@Injectable()
export class PartnerDrizzleRepository implements PartnerRepository {
  constructor(private readonly drizzle: DrizzleService) {}

  async save(entity: Partner): Promise<void> {
    const data = PartnerMapper.toPersistence(entity)
    await this.drizzle.db.insert(partners).values(data)
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

  async delete(id: PartnerId): Promise<void> {
    await this.drizzle.db.delete(partners).where(eq(partners.id, id.value))
  }
}
