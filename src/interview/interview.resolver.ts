import { Resolver } from '@nestjs/graphql';
import { InterviewService } from './interview.service';

@Resolver()
export class InterviewResolver {
  constructor(private readonly interviewService: InterviewService) {}
}
