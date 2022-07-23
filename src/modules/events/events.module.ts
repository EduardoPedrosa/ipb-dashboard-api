import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MembersModule } from 'modules/members/members.module'

import { EventsController } from './events.controller'
import { EventsRepository } from './events.repository'
import { Event, EventSchema } from './events.schema'
import { EventsService } from './events.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]), MembersModule],
  providers: [EventsService, EventsRepository],
  controllers: [EventsController],
})
export class EventsModule {}
