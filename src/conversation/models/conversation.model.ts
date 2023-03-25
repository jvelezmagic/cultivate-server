import { Field, ObjectType, ID, HideField } from '@nestjs/graphql';
import Prisma from '@prisma/client';

@ObjectType()
export class Conversation implements Prisma.Conversation {
  @Field(() => ID)
  id: string;

  @HideField()
  interviewId: string;

  @HideField()
  questionId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
