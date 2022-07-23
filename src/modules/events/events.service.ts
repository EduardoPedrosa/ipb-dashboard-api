import { Injectable, NotFoundException } from '@nestjs/common'
import { MembersService } from 'modules/members/members.service'
import mongoose from 'mongoose'

import { CreateEventDto } from './dtos/create-event.dto'
import { EventsRepository } from './events.repository'
import { Event } from './events.schema'

@Injectable()
export class EventsService {
  constructor(private readonly eventsRepository: EventsRepository, private readonly membersService: MembersService) {}

  async getAll(): Promise<Event[]> {
    return await this.eventsRepository.getAll()
  }

  async getById(id: mongoose.Schema.Types.ObjectId): Promise<Event> {
    const event = await this.eventsRepository.getById(id)
    if (!event) throw new NotFoundException('Event not found')

    return event
  }

  private async verifyMembers(memberIds: mongoose.Schema.Types.ObjectId[]): Promise<boolean> {
    const members = await this.membersService.getByIds(memberIds)
    return members.length === memberIds.length
  }

  async createEvent(event: CreateEventDto): Promise<Event> {
    return await this.eventsRepository.create(event)
  }

  async editEvent(id: mongoose.Schema.Types.ObjectId, event: CreateEventDto): Promise<Event> {
    const allMembers = []
    if (event.attendanceList) allMembers.push(...event.attendanceList)
    if (event.musicGroup) allMembers.push(...event.musicGroup)
    if (event.liturgist) allMembers.push(event.liturgist)
    if (event.prelector) allMembers.push(event.prelector)

    if (allMembers.length) {
      if (!(await this.verifyMembers(allMembers))) {
        throw new NotFoundException('Members not found')
      }
    }

    const editedEvent = await this.eventsRepository.edit(id, event)
    if (!editedEvent) throw new NotFoundException('Event not found')

    return editedEvent
  }
}
