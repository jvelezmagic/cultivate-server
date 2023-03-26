import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { Company } from 'src/@generated/company';
import { Conversation } from 'src/@generated/conversation';
import { Interview } from 'src/@generated/interview';
import { User } from 'src/@generated/user';

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
