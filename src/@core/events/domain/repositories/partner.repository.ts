import { IRepository } from '@/@core/common/domain/repository-interface'
import { Partner, PartnerId } from '../entities/partner.entity'

export abstract class PartnerRepository implements IRepository<Partner> {
  abstract save(entity: Partner): Promise<void>
  abstract findById(id: PartnerId): Promise<Partner | null>
  abstract findAll(): Promise<Partner[]>
  abstract delete(entity: Partner): Promise<void>
}
