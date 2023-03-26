import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { Company } from 'src/@generated/company';
import { Conversation } from 'src/@generated/conversation';
import { Question } from 'src/@generated/question';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(): Promise<Question[]> {
    return this.prisma.question.findMany();
  }

  async company(questionId): Promise<Company> {
    return this.prisma.question
      .findUnique({
        where: { id: questionId },
      })
      .company();
  }

  async conversations(questionId): Promise<Conversation[]> {
    return this.prisma.question
      .findUnique({
        where: { id: questionId },
      })
      .conversations();
  }
}
