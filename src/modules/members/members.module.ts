import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { MembersController } from './members.controller'
import { MembersRepository } from './members.repository'
import { Member, MemberSchema } from './members.schema'
import { MembersService } from './members.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: Member.name, schema: MemberSchema }])],
  providers: [MembersService, MembersRepository],
  controllers: [MembersController],
  exports: [MembersService],
})
export class MembersModule {}
