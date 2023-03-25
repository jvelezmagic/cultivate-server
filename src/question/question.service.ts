import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { Company } from 'src/company/models/company.model';
import { Conversation } from 'src/conversation/models/conversation.model';
import { Question } from './models/question.model';

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
