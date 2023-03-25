import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { MessageService } from './message.service';

import { Conversation } from '../conversation/models/conversation.model';
import { Message } from './models/message.model';

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Query(() => [Message])
  async messages(): Promise<Message[]> {
    return this.messageService.findMany();
  }

  @ResolveField(() => Conversation, { name: 'conversation' })
  async conversation(@Parent() message: Message): Promise<Conversation> {
    return this.messageService.conversation(message.id);
  }
}
