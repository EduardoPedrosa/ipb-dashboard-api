import { Injectable, NotFoundException } from '@nestjs/common'
import mongoose from 'mongoose'

import { CreateMemberDto } from './dtos/create-member.dto'
import { MembersRepository } from './members.repository'
import { Member } from './members.schema'

@Injectable()
export class MembersService {
  constructor(private readonly membersRepository: MembersRepository) {}

  async getAll(search?: string): Promise<Member[]> {
    return await this.membersRepository.getAll(search)
  }

  async getById(id: mongoose.Schema.Types.ObjectId): Promise<Member> {
    const member = await this.membersRepository.getById(id)
    if (!member) throw new NotFoundException('Member not found')

    return member
  }

  async createMember(member: CreateMemberDto): Promise<Member> {
    return await this.membersRepository.create(member)
  }

  async editMember(id: mongoose.Schema.Types.ObjectId, member: CreateMemberDto): Promise<Member> {
    const editedMember = await this.membersRepository.edit(id, member)
    if (!editedMember) throw new NotFoundException('Member not found')

    return editedMember
  }

  async getByIds(ids: mongoose.Schema.Types.ObjectId[]): Promise<Member[]> {
    return await this.membersRepository.getByIds(ids)
  }
}
