import { Field, ObjectType, ID, HideField } from '@nestjs/graphql';
import Prisma from '@prisma/client';

@ObjectType()
export class Interview implements Prisma.Interview {
  @Field(() => ID)
  id: string;

  @HideField()
  candidateId: string;

  @HideField()
  companyId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
