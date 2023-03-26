import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { Conversation } from 'src/@generated/conversation';
import {
  CreateOneMessageArgs,
  DeleteOneMessageArgs,
  FindManyMessageArgs,
  FindUniqueMessageArgs,
  Message,
  UpdateOneMessageArgs,
} from 'src/@generated/message';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(args: FindManyMessageArgs): Promise<Message[]> {
    return this.prisma.message.findMany(args);
  }

  async findUnique(args: FindUniqueMessageArgs): Promise<Message> {
    return this.prisma.message.findUnique(args);
  }

  async create(args: CreateOneMessageArgs): Promise<Message> {
    return this.prisma.message.create(args);
  }

  async update(args: UpdateOneMessageArgs): Promise<Message> {
    return this.prisma.message.update(args);
  }

  async delete(args: DeleteOneMessageArgs): Promise<Message> {
    return this.prisma.message.delete(args);
  }

  async conversation(message: Message): Promise<Conversation> {
    return this.prisma.message
      .findUnique({ where: { id: message.id } })
      .conversation();
  }
}
