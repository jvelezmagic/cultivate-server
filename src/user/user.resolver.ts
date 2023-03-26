import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserService } from './user.service';

import { Company } from 'src/@generated/company';
import { FindManyInterviewArgs, Interview } from 'src/@generated/interview';
import {
  CreateOneUserArgs,
  DeleteOneUserArgs,
  FindManyUserArgs,
  FindUniqueUserArgs,
  UpdateOneUserArgs,
  User,
} from 'src/@generated/user';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users(@Args() args: FindManyUserArgs): Promise<User[]> {
    return this.userService.findMany(args);
  }

  @Query(() => User, { nullable: true })
  async user(@Args() args: FindUniqueUserArgs): Promise<User> {
    return this.userService.findUnique(args);
  }

  @Mutation(() => User)
  async createUser(@Args() args: CreateOneUserArgs): Promise<User> {
    return this.userService.create(args);
  }

  @Mutation(() => User)
  async updateUser(@Args() args: UpdateOneUserArgs): Promise<User> {
    return this.userService.update(args);
  }

  @Mutation(() => User)
  async deleteUser(@Args() args: DeleteOneUserArgs): Promise<User> {
    return this.userService.delete(args);
  }

  @ResolveField(() => Company, { nullable: true })
  async company(@Parent() user: User): Promise<Company> {
    return this.userService.company(user);
  }

  @ResolveField(() => [Interview])
  async interviews(
    @Parent() user: User,
    @Args() args: FindManyInterviewArgs,
  ): Promise<Interview[]> {
    return this.userService.interviews(user, args);
  }
}
