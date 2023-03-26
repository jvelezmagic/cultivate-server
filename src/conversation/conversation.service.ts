import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { Conversation } from 'src/@generated/conversation';
import { Interview } from 'src/@generated/interview';
import { Message } from 'src/@generated/message';
import { Question } from 'src/@generated/question';

@Injectable()
export class ConversationService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(): Promise<Conversation[]> {
    return this.prisma.conversation.findMany();
  }

  async messages(conversationId: string): Promise<Message[]> {
    return this.prisma.conversation
      .findUnique({
        where: { id: conversationId },
      })
      .messages();
  }

  async question(conversationId: string): Promise<Question> {
    return this.prisma.conversation
      .findUnique({
        where: { id: conversationId },
      })
      .question();
  }

  async interview(conversationId: string): Promise<Interview> {
    return this.prisma.conversation
      .findUnique({
        where: { id: conversationId },
      })
      .interview();
  }
}
