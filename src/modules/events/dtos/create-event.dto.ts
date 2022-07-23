import { ApiProperty } from '@nestjs/swagger'
import { Member } from 'modules/members/members.schema'

export class CreateEventDto {
  @ApiProperty()
  type?: string

  @ApiProperty()
  description?: string

  @ApiProperty()
  date?: Date

  @ApiProperty()
  location?: string

  @ApiProperty()
  startAt?: string

  @ApiProperty()
  endAt?: string

  @ApiProperty()
  subject?: string

  @ApiProperty()
  liturgist?: Member

  @ApiProperty()
  prelector?: Member

  @ApiProperty()
  songs?: string[]

  @ApiProperty()
  musicGroup?: Member[]

  @ApiProperty()
  attendanceList?: Member[]
}
