import { Resolver } from '@nestjs/graphql';
import { ConversationService } from './conversation.service';

@Resolver()
export class ConversationResolver {
  constructor(private readonly conversationService: ConversationService) {}
}
