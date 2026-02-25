import { Module } from '@nestjs/common'
import { DrizzleModule } from './drizzle/drizzle.module'
import { PartnerRepository } from '@/@core/events/domain/repositories/partner.repository'
import { PartnerDrizzleRepository } from './drizzle/repositories/partner-drizzle.repository'

@Module({
  imports: [DrizzleModule],
  providers: [
    {
      provide: PartnerRepository,
      useClass: PartnerDrizzleRepository,
    },
  ],
  exports: [PartnerRepository],
})
export class DatabaseModule {}
