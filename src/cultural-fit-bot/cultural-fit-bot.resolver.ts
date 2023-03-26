import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CulturalFitBotService } from './cultural-fit-bot.service';

@Resolver()
export class CulturalFitBotResolver {
  constructor(private readonly culturalFitBotService: CulturalFitBotService) {}

  @Mutation(() => String, { name: 'chatWithCultivateBot', nullable: true })
  async chatWithCultivateBot(
    @Args('conversationId') conversationId: string,
    @Args('content') content: string,
  ) {
    return this.culturalFitBotService.chatWithCultivateBot(
      conversationId,
      content,
    );
  }

  @Query(() => String, { name: 'cultivateConversation', nullable: true })
  async cultivateConversation(@Args('conversationId') conversationId: string) {
    return this.culturalFitBotService.createConversationSummary(conversationId);
  }
}
