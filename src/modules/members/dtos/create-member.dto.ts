import { ApiProperty } from '@nestjs/swagger'

import { MaritalStatus } from '../members.types'

export class CreateMemberDto {
  @ApiProperty()
  name: string

  @ApiProperty()
  bornAt?: Date

  @ApiProperty()
  gender: string

  @ApiProperty()
  phoneNumber?: string

  @ApiProperty()
  email?: string

  @ApiProperty()
  address?: string

  @ApiProperty()
  church?: string

  @ApiProperty({ type: String, enum: MaritalStatus })
  maritalStatus?: MaritalStatus

  @ApiProperty()
  ocupation?: string
}
