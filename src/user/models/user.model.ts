import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  avatarUrl: string | null;

  @HideField()
  password: string;
}
