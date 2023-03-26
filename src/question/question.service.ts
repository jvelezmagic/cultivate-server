import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { Company } from 'src/@generated/company';
import { Conversation } from 'src/@generated/conversation';
import { FindManyConversationArgs } from 'src/@generated/conversation/find-many-conversation.args';
import {
  CreateOneQuestionArgs,
  DeleteOneQuestionArgs,
  FindManyQuestionArgs,
  FindUniqueQuestionArgs,
  Question,
  UpdateOneQuestionArgs,
} from 'src/@generated/question';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(args: FindManyQuestionArgs): Promise<Question[]> {
    return this.prisma.question.findMany(args);
  }

  async findUnique(args: FindUniqueQuestionArgs): Promise<Question> {
    return this.prisma.question.findUnique(args);
  }

  async create(args: CreateOneQuestionArgs): Promise<Question> {
    return this.prisma.question.create(args);
  }

  async update(args: UpdateOneQuestionArgs): Promise<Question> {
    return this.prisma.question.update(args);
  }

  async delete(args: DeleteOneQuestionArgs): Promise<Question> {
    return this.prisma.question.delete(args);
  }

  async company(question: Question): Promise<Company> {
    return this.prisma.question
      .findUnique({ where: { id: question.id } })
      .company();
  }

  async conversations(
    question: Question,
    args: FindManyConversationArgs,
  ): Promise<Conversation[]> {
    return this.prisma.question
      .findUnique({ where: { id: question.id } })
      .conversations(args);
  }
}
