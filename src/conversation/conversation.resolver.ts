import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ConversationService } from './conversation.service';

import { Conversation } from 'src/@generated/conversation';
import { Interview } from 'src/@generated/interview';
import { Message } from 'src/@generated/message';
import { Question } from 'src/@generated/question';

@Resolver(() => Conversation)
export class ConversationResolver {
  constructor(private readonly conversationService: ConversationService) {}

  @Query(() => [Conversation])
  async conversations(): Promise<Conversation[]> {
    return this.conversationService.findMany();
  }

  @ResolveField(() => [Message])
  async messages(@Parent() conversation: Conversation): Promise<Message[]> {
    return this.conversationService.messages(conversation.id);
  }

  @ResolveField(() => Question)
  async question(@Parent() conversation: Conversation): Promise<Question> {
    return this.conversationService.question(conversation.id);
  }

  @ResolveField(() => Interview)
  async interview(@Parent() conversation: Conversation): Promise<Interview> {
    return this.conversationService.interview(conversation.id);
  }
}
