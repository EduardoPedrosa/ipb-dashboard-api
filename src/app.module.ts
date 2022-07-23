import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { AppService } from './app.service'
import { getDBConnectionUrl } from './config/get-db-connection-url'
import { EventsModule } from './modules/events/events.module'
import { MembersModule } from './modules/members/members.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(getDBConnectionUrl()),
    MembersModule,
    EventsModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
