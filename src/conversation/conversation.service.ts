import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { Interview } from 'src/interview/models/interview.model';
import { Message } from 'src/message/models/message.model';
import { Question } from 'src/question/models/question.model';
import { Conversation } from './models/conversation.model';

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
