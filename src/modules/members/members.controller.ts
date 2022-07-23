import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'

import { CreateMemberDto } from './dtos/create-member.dto'
import { Member } from './members.schema'
import { MembersService } from './members.service'

@ApiTags('members')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get('/')
  @ApiQuery({ name: 'search', type: String, required: false })
  @ApiResponse({ type: Member, isArray: true })
  async getMembers(@Query('search') search?: string): Promise<Member[]> {
    return await this.membersService.getAll(search)
  }

  @Get('/:id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ type: Member })
  async getMember(@Param('id') id): Promise<Member> {
    return await this.membersService.getById(id)
  }

  @Post('/')
  @ApiBody({ type: CreateMemberDto })
  @ApiResponse({ type: Member })
  async createMember(@Body() member: CreateMemberDto): Promise<Member> {
    return await this.membersService.createMember(member)
  }

  @Put('/:id')
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: CreateMemberDto })
  @ApiResponse({ type: Member })
  async editMember(@Param('id') id, @Body() member: CreateMemberDto): Promise<Member> {
    return await this.membersService.editMember(id, member)
  }
}
