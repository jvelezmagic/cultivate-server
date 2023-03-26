import { Module } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { InterviewResolver } from './interview.resolver';
import { CulturalFitBotModule } from 'src/cultural-fit-bot/cultural-fit-bot.module';

@Module({
  providers: [InterviewResolver, InterviewService],
  imports: [CulturalFitBotModule],
})
export class InterviewModule {}
