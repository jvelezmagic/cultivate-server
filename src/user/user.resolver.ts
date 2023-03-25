import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UsersService } from './user.service';

import { Interview } from 'src/interview/models/interview.model';
import { Company } from '../company/models/company.model';
import { User } from './models/user.model';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users', nullable: false })
  async users(): Promise<User[]> {
    return this.usersService.findMany();
  }

  @ResolveField(() => Company, { name: 'company', nullable: true })
  async company(@Parent() user: User): Promise<Company | null> {
    return this.usersService.company(user.id);
  }

  @ResolveField(() => [Interview], { name: 'interviews', nullable: false })
  async interviews(@Parent() user: User): Promise<Interview[]> {
    return this.usersService.interviews(user.id);
  }
}
