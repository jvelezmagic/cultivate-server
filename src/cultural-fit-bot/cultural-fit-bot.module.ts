import { Module } from '@nestjs/common';
import { CulturalFitBotService } from './cultural-fit-bot.service';
import { CulturalFitBotResolver } from './cultural-fit-bot.resolver';

@Module({
  providers: [CulturalFitBotResolver, CulturalFitBotService],
  exports: [CulturalFitBotService],
})
export class CulturalFitBotModule {}
