import { Module } from '@nestjs/common'
import { DatabaseModule } from './core/events/infra/database/database.module'
import { EventsHttpModule } from './core/events/infra/http/events-http.module'

@Module({
  imports: [DatabaseModule, EventsHttpModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
