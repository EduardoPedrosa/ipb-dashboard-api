import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { Gender, MaritalStatus } from './members.types'

export type MemberDocument = Member & Document

@Schema()
export class Member {
  @Prop({ required: true, text: true })
  name: string

  @Prop()
  bornAt: Date

  @Prop({ type: String, enum: Gender })
  gender: Gender

  @Prop()
  phoneNumber: string

  @Prop({ text: true })
  email: string

  @Prop()
  address: string

  @Prop()
  church: string

  @Prop({ type: String, enum: MaritalStatus })
  maritalStatus: MaritalStatus

  @Prop()
  ocupation: string
}

export const MemberSchema = SchemaFactory.createForClass(Member)
