import { Partner } from '@/@core/events/domain/entities/partner.entity'
import type { PartnerSelect } from '../schemas/partner.schema'

export class PartnerMapper {
  static toDomain(raw: PartnerSelect): Partner {
    return new Partner({
      id: raw.id,
      name: raw.name,
    })
  }

  static toPersistence(partner: Partner): PartnerSelect {
    return {
      id: partner.id.value,
      name: partner.name,
    }
  }
}
