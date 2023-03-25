import { Field, ObjectType, ID } from '@nestjs/graphql';
import Prisma from '@prisma/client';

@ObjectType()
export class Company implements Prisma.Company {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  avatarUrl: string | null;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
