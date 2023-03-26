import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { QuestionService } from './question.service';

import { Company } from 'src/@generated/company';
import { Conversation } from 'src/@generated/conversation';
import { FindManyConversationArgs } from 'src/@generated/conversation/find-many-conversation.args';
import {
  CreateOneQuestionArgs,
  DeleteOneQuestionArgs,
  FindManyQuestionArgs,
  FindUniqueQuestionArgs,
  Question,
  UpdateOneQuestionArgs,
} from 'src/@generated/question';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Query(() => [Question])
  async questions(@Args() args: FindManyQuestionArgs): Promise<Question[]> {
    return this.questionService.findMany(args);
  }

  @Query(() => Question, { nullable: true })
  async question(@Args() args: FindUniqueQuestionArgs): Promise<Question> {
    return this.questionService.findUnique(args);
  }

  @Mutation(() => Question)
  async createQuestion(@Args() args: CreateOneQuestionArgs): Promise<Question> {
    return this.questionService.create(args);
  }

  @Mutation(() => Question)
  async updateQuestion(@Args() args: UpdateOneQuestionArgs): Promise<Question> {
    return this.questionService.update(args);
  }

  @Mutation(() => Question)
  async deleteQuestion(@Args() args: DeleteOneQuestionArgs): Promise<Question> {
    return this.questionService.delete(args);
  }

  @ResolveField(() => Company)
  async company(@Parent() question: Question): Promise<Company> {
    return this.questionService.company(question);
  }

  @ResolveField(() => [Conversation])
  async conversations(
    @Parent() question: Question,
    @Args() args: FindManyConversationArgs,
  ): Promise<Conversation[]> {
    return this.questionService.conversations(question, args);
  }
}
