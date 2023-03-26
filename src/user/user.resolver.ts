import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';

import { Company } from 'src/@generated/company';
import { Interview } from 'src/@generated/interview';
import { User } from 'src/@generated/user';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'users', nullable: false })
  async users(): Promise<User[]> {
    return this.userService.findMany();
  }

  @ResolveField(() => Company, { name: 'company', nullable: true })
  async company(@Parent() user: User): Promise<Company | null> {
    return this.userService.company(user.id);
  }

  @ResolveField(() => [Interview], { name: 'interviews', nullable: false })
  async interviews(@Parent() user: User): Promise<Interview[]> {
    return this.userService.interviews(user.id);
  }
}
