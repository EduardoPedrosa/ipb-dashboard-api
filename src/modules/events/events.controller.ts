import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'

import { CreateEventDto } from './dtos/create-event.dto'
import { Event } from './events.schema'
import { EventsService } from './events.service'

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get('/')
  @ApiResponse({ type: Event, isArray: true })
  async getEvents(): Promise<Event[]> {
    return await this.eventsService.getAll()
  }

  @Get('/:id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ type: Event })
  async getEvent(@Param('id') id): Promise<Event> {
    return await this.eventsService.getById(id)
  }

  @Post('/')
  @ApiBody({ type: CreateEventDto })
  @ApiResponse({ type: Event })
  async createEvent(@Body() event: CreateEventDto): Promise<Event> {
    return await this.eventsService.createEvent(event)
  }

  @Put('/:id')
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: CreateEventDto })
  @ApiResponse({ type: Event })
  async editEvent(@Param('id') id, @Body() event: CreateEventDto): Promise<Event> {
    return await this.eventsService.editEvent(id, event)
  }
}
