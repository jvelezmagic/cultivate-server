import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { InterviewService } from './interview.service';

import { Company } from 'src/@generated/company';
import {
  Conversation,
  FindManyConversationArgs,
} from 'src/@generated/conversation';
import {
  CreateOneInterviewArgs,
  DeleteOneInterviewArgs,
  FindManyInterviewArgs,
  FindUniqueInterviewArgs,
  Interview,
  UpdateOneInterviewArgs,
} from 'src/@generated/interview';
import { User } from 'src/@generated/user';

@Resolver(() => Interview)
export class InterviewResolver {
  constructor(private readonly interviewService: InterviewService) {}

  @Query(() => [Interview])
  async interviews(@Args() args: FindManyInterviewArgs): Promise<Interview[]> {
    return this.interviewService.findMany(args);
  }

  @Query(() => Interview)
  async interview(@Args() args: FindUniqueInterviewArgs): Promise<Interview> {
    return this.interviewService.findUnique(args);
  }

  @Mutation(() => Interview)
  async createInterview(
    @Args() args: CreateOneInterviewArgs,
  ): Promise<Interview> {
    return this.interviewService.create(args);
  }

  @Mutation(() => Interview)
  async updateInterview(
    @Args() args: UpdateOneInterviewArgs,
  ): Promise<Interview> {
    return this.interviewService.update(args);
  }

  @Mutation(() => Interview, { nullable: true })
  async deleteInterview(
    @Args() args: DeleteOneInterviewArgs,
  ): Promise<Interview> {
    return this.interviewService.delete(args);
  }

  @ResolveField(() => Company)
  async company(@Parent() interview: Interview): Promise<Company> {
    return this.interviewService.company(interview);
  }

  @ResolveField(() => User)
  async candidate(@Parent() interview: Interview): Promise<User> {
    return this.interviewService.candidate(interview);
  }

  @ResolveField(() => [Conversation])
  async conversations(
    @Parent() interview: Interview,
    @Args() args: FindManyConversationArgs,
  ): Promise<Conversation[]> {
    return this.interviewService.conversations(interview, args);
  }
}
