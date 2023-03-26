import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { Company } from 'src/@generated/company';
import {
  Conversation,
  FindManyConversationArgs,
} from 'src/@generated/conversation';
import {
  CreateOneInterviewArgs,
  DeleteOneInterviewArgs,
  FindManyInterviewArgs,
  FindUniqueInterviewArgs,
  Interview,
  UpdateOneInterviewArgs,
} from 'src/@generated/interview';
import { User } from 'src/@generated/user';
import { CulturalFitBotService } from '../cultural-fit-bot/cultural-fit-bot.service';

@Injectable()
export class InterviewService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cultivateBotService: CulturalFitBotService,
  ) {}

  async findMany(args: FindManyInterviewArgs): Promise<Interview[]> {
    return this.prisma.interview.findMany(args);
  }

  async findUnique(args: FindUniqueInterviewArgs): Promise<Interview> {
    return this.prisma.interview.findUnique(args);
  }

  async create(args: CreateOneInterviewArgs): Promise<Interview> {
    return this.prisma.interview.create(args);
  }

  async update(args: UpdateOneInterviewArgs): Promise<Interview> {
    return this.prisma.interview.update(args);
  }

  async delete(args: DeleteOneInterviewArgs): Promise<Interview> {
    return this.prisma.interview.delete(args);
  }

  async company(interview: Interview): Promise<Company> {
    return this.prisma.interview
      .findUnique({ where: { id: interview.id } })
      .company();
  }

  async candidate(interview: Interview): Promise<User> {
    return this.prisma.interview
      .findUnique({ where: { id: interview.id } })
      .candidate();
  }

  async conversations(
    interview: Interview,
    args: FindManyConversationArgs,
  ): Promise<Conversation[]> {
    return this.prisma.interview
      .findUnique({ where: { id: interview.id } })
      .conversations(args);
  }

  async setUpCompleInterview(
    candidateId: string,
    companyId: string,
  ): Promise<Interview> {
    const interview = await this.prisma.interview.upsert({
      where: {
        candidateId_companyId: {
          candidateId,
          companyId,
        },
      },
      update: {},
      create: {
        candidate: {
          connect: {
            id: candidateId,
          },
        },
        company: {
          connect: {
            id: companyId,
          },
        },
      },
    });

    const questions = await this.prisma.question.findMany({
      select: {
        id: true,
      },
      where: {
        companyId,
      },
    });

    await this.prisma.conversation.createMany({
      data: [
        ...questions.map((question) => ({
          questionId: question.id,
          interviewId: interview.id,
        })),
      ],
      skipDuplicates: true,
    });

    const conversations = await this.prisma.conversation.findMany({
      select: {
        id: true,
      },
      where: {
        interviewId: interview.id,
      },
    });

    await Promise.all(
      conversations.map(async ({ id }) => {
        try {
          await this.cultivateBotService.chatWithCulturalFitBot(id, null);
        } catch (e) {}
      }),
    );

    return interview;
  }
}
