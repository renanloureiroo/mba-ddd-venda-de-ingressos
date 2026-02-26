import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CustomerService } from '../../application/services/customer.service'
import { CustomerController } from './controllers/customer.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class EventsHttpModule {}
