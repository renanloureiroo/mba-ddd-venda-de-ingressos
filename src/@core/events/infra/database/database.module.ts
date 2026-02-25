import { Module } from '@nestjs/common'
import { DrizzleModule } from './drizzle/drizzle.module'
import { PartnerRepository } from '@/@core/events/domain/repositories/partner.repository'
import { PartnerDrizzleRepository } from './repositories/partner-drizzle.repository'
import { EventRepository } from '@/@core/events/domain/repositories/event.repository'
import { EventDrizzleRepository } from './repositories/event-drizzle.repository'
import { CustomerRepository } from '@/@core/events/domain/repositories/customer.repository'
import { CustomerDrizzleRepository } from './repositories/customer-drizzle.repository'

@Module({
  imports: [DrizzleModule],
  providers: [
    {
      provide: PartnerRepository,
      useClass: PartnerDrizzleRepository,
    },
    {
      provide: EventRepository,
      useClass: EventDrizzleRepository,
    },
    {
      provide: CustomerRepository,
      useClass: CustomerDrizzleRepository,
    },
  ],
  exports: [PartnerRepository, EventRepository, CustomerRepository],
})
export class DatabaseModule {}
