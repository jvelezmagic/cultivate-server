import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import {
  Conversation,
  CreateOneConversationArgs,
  DeleteOneConversationArgs,
  FindManyConversationArgs,
  FindUniqueConversationArgs,
  UpdateOneConversationArgs,
} from 'src/@generated/conversation';
import { Interview } from 'src/@generated/interview';
import { FindManyMessageArgs, Message } from 'src/@generated/message';
import { Question } from 'src/@generated/question';

@Injectable()
export class ConversationService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(args: FindManyConversationArgs): Promise<Conversation[]> {
    return this.prisma.conversation.findMany(args);
  }

  async findUnique(args: FindUniqueConversationArgs): Promise<Conversation> {
    return this.prisma.conversation.findUnique(args);
  }

  async create(args: CreateOneConversationArgs): Promise<Conversation> {
    return this.prisma.conversation.create(args);
  }

  async update(args: UpdateOneConversationArgs): Promise<Conversation> {
    return this.prisma.conversation.update(args);
  }

  async delete(args: DeleteOneConversationArgs): Promise<Conversation> {
    return this.prisma.conversation.delete(args);
  }

  async interview(conversation: Conversation): Promise<Interview> {
    return this.prisma.conversation
      .findUnique({ where: { id: conversation.id } })
      .interview();
  }

  async messages(
    conversation: Conversation,
    args: FindManyMessageArgs,
  ): Promise<Message[]> {
    return this.prisma.conversation
      .findUnique({ where: { id: conversation.id } })
      .messages(args);
  }

  async question(conversation: Conversation): Promise<Question> {
    return this.prisma.conversation
      .findUnique({ where: { id: conversation.id } })
      .question();
  }
}
