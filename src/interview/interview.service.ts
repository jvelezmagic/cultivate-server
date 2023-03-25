import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { Company } from 'src/company/models/company.model';
import { Conversation } from 'src/conversation/models/conversation.model';
import { User } from 'src/user/models/user.model';
import { Interview } from './models/interview.model';

@Injectable()
export class InterviewService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(): Promise<Interview[]> {
    return this.prisma.interview.findMany();
  }

  async candidate(interviewId: string): Promise<User> {
    return this.prisma.interview
      .findUnique({
        where: { id: interviewId },
      })
      .candidate();
  }

  async company(interviewId: string): Promise<Company> {
    return this.prisma.interview
      .findUnique({
        where: { id: interviewId },
      })
      .company();
  }

  async conversations(interviewId: string): Promise<Conversation[]> {
    return this.prisma.interview
      .findUnique({
        where: { id: interviewId },
      })
      .conversations();
  }
}
