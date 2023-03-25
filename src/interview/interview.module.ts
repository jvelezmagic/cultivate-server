import { Module } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { InterviewResolver } from './interview.resolver';

@Module({
  providers: [InterviewResolver, InterviewService]
})
export class InterviewModule {}
