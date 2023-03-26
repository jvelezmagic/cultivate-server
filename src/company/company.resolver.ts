import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CompanyService } from './company.service';

import {
  Company,
  CreateOneCompanyArgs,
  DeleteOneCompanyArgs,
  FindManyCompanyArgs,
  FindUniqueCompanyArgs,
  UpdateOneCompanyArgs,
} from 'src/@generated/company';
import { FindManyInterviewArgs, Interview } from 'src/@generated/interview';
import { FindManyQuestionArgs, Question } from 'src/@generated/question';
import { User } from 'src/@generated/user';

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Query(() => [Company])
  async companies(@Args() args: FindManyCompanyArgs): Promise<Company[]> {
    return this.companyService.findMany(args);
  }

  @Query(() => Company, { nullable: true })
  async company(@Args() args: FindUniqueCompanyArgs): Promise<Company> {
    return this.companyService.findUnique(args);
  }

  @Mutation(() => Company)
  async createCompany(@Args() args: CreateOneCompanyArgs): Promise<Company> {
    return this.companyService.create(args);
  }

  @Mutation(() => Company)
  async updateCompany(@Args() args: UpdateOneCompanyArgs): Promise<Company> {
    return this.companyService.update(args);
  }

  @Mutation(() => Company)
  async deleteCompany(@Args() args: DeleteOneCompanyArgs): Promise<Company> {
    return this.companyService.delete(args);
  }

  @ResolveField(() => [Interview])
  async interviews(
    @Parent() company: Company,
    @Args() args: FindManyInterviewArgs,
  ): Promise<Interview[]> {
    return this.companyService.interviews(company, args);
  }

  @ResolveField(() => [Question])
  async questions(
    @Parent() company: Company,
    @Args() args: FindManyQuestionArgs,
  ): Promise<Question[]> {
    return this.companyService.questions(company, args);
  }

  @ResolveField(() => [User])
  async members(@Parent() company: Company): Promise<User[]> {
    return this.companyService.members(company);
  }
}
