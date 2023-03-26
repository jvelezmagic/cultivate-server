import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CompanyService } from './company.service';

import { Company } from 'src/@generated/company';
import { Interview } from 'src/@generated/interview';
import { Question } from 'src/@generated/question';
import { User } from 'src/@generated/user';

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Query(() => [Company])
  async companies(): Promise<Company[]> {
    return this.companyService.findMany();
  }

  @ResolveField(() => [User])
  async members(@Parent() company: Company): Promise<User[]> {
    return this.companyService.companyMembers(company.id);
  }

  @ResolveField(() => [Question])
  async questions(@Parent() company: Company): Promise<Question[]> {
    return this.companyService.questions(company.id);
  }

  @ResolveField(() => [Interview])
  async interviews(@Parent() company: Company): Promise<Interview[]> {
    return this.companyService.inteviews(company.id);
  }
}
