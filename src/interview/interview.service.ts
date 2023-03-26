import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { Company } from 'src/@generated/company';
import {
  Conversation,
  FindManyConversationArgs,
} from 'src/@generated/conversation';
import {
  CreateOneInterviewArgs,
  DeleteOneInterviewArgs,
  FindManyInterviewArgs,
  FindUniqueInterviewArgs,
  Interview,
  UpdateOneInterviewArgs,
} from 'src/@generated/interview';
import { User } from 'src/@generated/user';

@Injectable()
export class InterviewService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(args: FindManyInterviewArgs): Promise<Interview[]> {
    return this.prisma.interview.findMany(args);
  }

  async findUnique(args: FindUniqueInterviewArgs): Promise<Interview> {
    return this.prisma.interview.findUnique(args);
  }

  async create(args: CreateOneInterviewArgs): Promise<Interview> {
    return this.prisma.interview.create(args);
  }

  async update(args: UpdateOneInterviewArgs): Promise<Interview> {
    return this.prisma.interview.update(args);
  }

  async delete(args: DeleteOneInterviewArgs): Promise<Interview> {
    return this.prisma.interview.delete(args);
  }

  async company(interview: Interview): Promise<Company> {
    return this.prisma.interview
      .findUnique({ where: { id: interview.id } })
      .company();
  }

  async candidate(interview: Interview): Promise<User> {
    return this.prisma.interview
      .findUnique({ where: { id: interview.id } })
      .candidate();
  }

  async conversations(
    interview: Interview,
    args: FindManyConversationArgs,
  ): Promise<Conversation[]> {
    return this.prisma.interview
      .findUnique({ where: { id: interview.id } })
      .conversations(args);
  }
}
