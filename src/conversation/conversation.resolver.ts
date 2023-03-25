import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ConversationService } from './conversation.service';

import { Interview } from 'src/interview/models/interview.model';
import { Message } from 'src/message/models/message.model';
import { Question } from 'src/question/models/question.model';
import { Conversation } from './models/conversation.model';

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
