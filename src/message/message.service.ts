import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { Conversation } from 'src/@generated/conversation';
import { Message } from 'src/@generated/message';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(): Promise<Message[]> {
    return this.prisma.message.findMany();
  }

  async conversation(messageId: string): Promise<Conversation> {
    return this.prisma.message
      .findUnique({
        where: { id: messageId },
      })
      .conversation();
  }
}
