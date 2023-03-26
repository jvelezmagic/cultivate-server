import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CulturalFitBotService } from './cultural-fit-bot.service';

@Resolver()
export class CulturalFitBotResolver {
  constructor(private readonly culturalFitBotService: CulturalFitBotService) {}

  @Mutation(() => String, { name: 'chatWithCultivateBot', nullable: true })
  async chatWithCultivateBot(
    @Args('conversationId') conversationId: string,
    @Args('content', { nullable: true }) content: string | null,
  ) {
    return this.culturalFitBotService.chatWithCultivateBot(
      conversationId,
      content,
    );
  }
}
