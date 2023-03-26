import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ConversationService } from './conversation.service';

import {
  Conversation,
  CreateOneConversationArgs,
  DeleteOneConversationArgs,
  FindManyConversationArgs,
  FindUniqueConversationArgs,
  UpdateOneConversationArgs,
} from 'src/@generated/conversation';
import { Interview } from 'src/@generated/interview';
import { FindManyMessageArgs, Message } from 'src/@generated/message';
import { Question } from 'src/@generated/question';

@Resolver(() => Conversation)
export class ConversationResolver {
  constructor(private readonly conversationService: ConversationService) {}

  @Query(() => [Conversation])
  async conversations(
    @Args() args: FindManyConversationArgs,
  ): Promise<Conversation[]> {
    return this.conversationService.findMany(args);
  }

  @Query(() => Conversation, { nullable: true })
  async conversation(
    @Args() args: FindUniqueConversationArgs,
  ): Promise<Conversation> {
    return this.conversationService.findUnique(args);
  }

  @Mutation(() => Conversation)
  async createConversation(
    @Args() args: CreateOneConversationArgs,
  ): Promise<Conversation> {
    return this.conversationService.create(args);
  }

  @Mutation(() => Conversation)
  async updateConversation(
    @Args() args: UpdateOneConversationArgs,
  ): Promise<Conversation> {
    return this.conversationService.update(args);
  }

  @Mutation(() => Conversation)
  async deleteConversation(
    @Args() args: DeleteOneConversationArgs,
  ): Promise<Conversation> {
    return this.conversationService.delete(args);
  }

  @ResolveField(() => Interview)
  async interview(@Parent() conversation: Conversation): Promise<Interview> {
    return this.conversationService.interview(conversation);
  }

  @ResolveField(() => [Message])
  async messages(
    @Parent() conversation: Conversation,
    @Args() args: FindManyMessageArgs,
  ): Promise<Message[]> {
    return this.conversationService.messages(conversation, args);
  }

  @ResolveField(() => Question)
  async question(@Parent() conversation: Conversation): Promise<Question> {
    return this.conversationService.question(conversation);
  }
}
