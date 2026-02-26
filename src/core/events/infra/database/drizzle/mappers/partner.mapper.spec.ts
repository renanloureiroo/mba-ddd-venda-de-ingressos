import {
  Partner,
  PartnerId,
} from '@/core/events/domain/entities/partner.entity'
import { PartnerMapper } from './partner.mapper'

describe('PartnerMapper', () => {
  describe('toDomain', () => {
    it('deve converter um registro do banco para a entidade Partner', () => {
      const raw = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Partner Teste',
      }

      const partner = PartnerMapper.toDomain(raw)

      expect(partner).toBeInstanceOf(Partner)
      expect(partner.id).toBeInstanceOf(PartnerId)
      expect(partner.id.value).toBe(raw.id)
      expect(partner.name).toBe(raw.name)
    })
  })

  describe('toPersistence', () => {
    it('deve converter a entidade Partner para o formato do banco', () => {
      const partner = new Partner({
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Partner Teste',
      })

      const persistence = PartnerMapper.toPersistence(partner)

      expect(persistence).toEqual({
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Partner Teste',
      })
    })
  })

  describe('roundtrip', () => {
    it('deve manter os dados intactos após toDomain → toPersistence', () => {
      const raw = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Partner Roundtrip',
      }

      const partner = PartnerMapper.toDomain(raw)
      const persistence = PartnerMapper.toPersistence(partner)

      expect(persistence).toEqual(raw)
    })

    it('deve manter os dados intactos após toPersistence → toDomain', () => {
      const partner = Partner.create({
        name: 'Partner Novo',
        email: 'partner@test.com',
      })

      const persistence = PartnerMapper.toPersistence(partner)
      const restored = PartnerMapper.toDomain(persistence)

      expect(restored.id.value).toBe(partner.id.value)
      expect(restored.name).toBe(partner.name)
    })
  })
})
