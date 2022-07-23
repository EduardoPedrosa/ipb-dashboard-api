import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import mongoose, { Model } from 'mongoose'

import { CreateEventDto } from './dtos/create-event.dto'
import { Event, EventDocument } from './events.schema'

@Injectable()
export class EventsRepository {
  constructor(@InjectModel(Event.name) private eventModel: Model<EventDocument>) {}

  async getAll(): Promise<Event[]> {
    return await this.eventModel.find()
  }

  async getById(id: mongoose.Schema.Types.ObjectId): Promise<Event> {
    return await this.eventModel.findById(id).populate(['attendanceList', 'liturgist', 'prelector', 'musicGroup'])
  }

  async create(event: CreateEventDto): Promise<Event> {
    const newEvent = new this.eventModel(event)
    return await newEvent.save()
  }

  async edit(id: mongoose.Schema.Types.ObjectId, event: CreateEventDto): Promise<Event> {
    return await this.eventModel.findByIdAndUpdate(id, event, { new: true })
  }
}
