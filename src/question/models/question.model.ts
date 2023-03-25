import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import Prisma from '@prisma/client';

@ObjectType()
export class Question implements Prisma.Question {
  @Field(() => ID)
  id: string;

  @HideField()
  companyId: string;

  @Field(() => String)
  title: string;

  @Field(() => [String])
  goals: string[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
