import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import mongoose, { Model } from 'mongoose'

import { CreateMemberDto } from './dtos/create-member.dto'
import { Member, MemberDocument } from './members.schema'

@Injectable()
export class MembersRepository {
  constructor(@InjectModel(Member.name) private membersModel: Model<MemberDocument>) {}

  async getAll(search?: string): Promise<Member[]> {
    const query = search ? { $text: { $search: search } } : {}

    return await this.membersModel.find(query)
  }

  async getById(id: mongoose.Schema.Types.ObjectId): Promise<Member> {
    return await this.membersModel.findById(id)
  }

  async create(member: CreateMemberDto): Promise<Member> {
    const newMember = new this.membersModel(member)
    return await newMember.save()
  }

  async edit(id: mongoose.Schema.Types.ObjectId, member: CreateMemberDto): Promise<Member> {
    return await this.membersModel.findByIdAndUpdate(id, member, { new: true })
  }

  async getByIds(ids: mongoose.Schema.Types.ObjectId[]): Promise<Member[]> {
    return await this.membersModel.find({ _id: { $in: ids } })
  }
}
