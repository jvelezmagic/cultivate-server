import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { QuestionService } from './question.service';

import { Company } from 'src/company/models/company.model';
import { Conversation } from 'src/conversation/models/conversation.model';
import { Question } from './models/question.model';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Query(() => [Question])
  async questions(): Promise<Question[]> {
    return this.questionService.findMany();
  }

  @ResolveField(() => Company)
  async company(@Parent() question: Question): Promise<Company> {
    return this.questionService.company(question.id);
  }

  @ResolveField(() => [Conversation])
  async conversations(@Parent() question: Question): Promise<Conversation[]> {
    return this.questionService.conversations(question.id);
  }
}
