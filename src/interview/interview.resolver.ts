import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { InterviewService } from './interview.service';

import { Company } from 'src/company/models/company.model';
import { Conversation } from 'src/conversation/models/conversation.model';
import { User } from 'src/user/models/user.model';
import { Interview } from './models/interview.model';

@Resolver(() => Interview)
export class InterviewResolver {
  constructor(private readonly interviewService: InterviewService) {}

  @Query(() => [Interview])
  async interviews(): Promise<Interview[]> {
    return this.interviewService.findMany();
  }

  @ResolveField(() => User)
  async candidate(@Parent() interview: Interview): Promise<User> {
    return this.interviewService.candidate(interview.id);
  }

  @ResolveField(() => Company)
  async company(@Parent() interview: Interview): Promise<Company> {
    return this.interviewService.company(interview.id);
  }

  @ResolveField(() => [Conversation])
  async conversations(@Parent() interview: Interview): Promise<Conversation[]> {
    return this.interviewService.conversations(interview.id);
  }
}
