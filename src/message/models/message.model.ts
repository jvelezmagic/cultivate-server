import { Field, ObjectType, ID, HideField } from '@nestjs/graphql';
import Prisma from '@prisma/client';
import { MessageRole } from '../enums/message-role.enum';

@ObjectType()
export class Message implements Prisma.Message {
  @Field(() => ID)
  id: string;

  @HideField()
  conversationId: string;

  @Field(() => MessageRole)
  role: keyof typeof MessageRole;

  @Field(() => String)
  content: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
