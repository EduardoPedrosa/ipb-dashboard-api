import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Member } from 'modules/members/members.schema'
import mongoose, { Document } from 'mongoose'

export type EventDocument = Event & Document

@Schema()
export class Event {
  @Prop({ required: true })
  type: string

  @Prop()
  description: string

  @Prop({ required: true })
  date: Date

  @Prop()
  location: string

  @Prop()
  startAt: string

  @Prop()
  endAt: string

  @Prop()
  subject: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Member' })
  liturgist: Member

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Member' })
  prelector: Member

  @Prop()
  songs: string[]

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }] })
  musicGroup: Member[]

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }] })
  attendanceList: Member[]
}

export const EventSchema = SchemaFactory.createForClass(Event)
