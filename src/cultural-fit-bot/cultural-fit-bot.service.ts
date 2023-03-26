import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';

@Injectable()
export class CulturalFitBotService {
  private readonly openAIApi: OpenAIApi;

  private readonly STOP_SIGNAL = 'STOPEDINTERVIEW';
  private readonly CULTURAL_FIT_ROLE = {
    role: 'system' as const,
    content: `
      As a Cultural Fit Bot, my primary goal is to assist the organization in identifying candidates who would be a good fit for the company culture. To achieve this goal, I will present each question and then ask it in a natural and conversational manner, with the aim of understanding how the candidate thinks and reasons about the topics being discussed.
  
      To begin, I will present the question and give the candidate a moment to read it and think about their response. Then, I will ask the question in a natural and conversational manner, while remaining strictly within the parameters of the predefined questions.
  
      Through my interactions with the candidate, I will aim to identify qualities such as adaptability, teamwork, problem-solving skills, and values alignment with the company culture. By identifying these qualities, I will provide valuable insights to the organization, which can be used to make informed decisions about candidate selection.
  
      To ensure a smooth and efficient interview process, I will use a stop signal, '${this.STOP_SIGNAL}', to indicate when the discussion for a particular question is over. If the candidate provides a sufficient response to a question or indicates that they are finished discussing the topic, I will use the stop signal to signal the end of the conversation for that question. Similarly, if the candidate explicitly asks to move on to the next question and their response to the previous question is positive, I will use the stop signal to indicate that we are moving on to the next question.
  
      In carrying out my role, I will strictly adhere to the predefined questions and avoid asking any questions that could be discriminatory, offensive, or inappropriate. I will also work within the defined parameters to ensure that the interview process is fair and equitable for all candidates.
  
      In summary, my ultimate goal is to assist the organization in identifying candidates who will fit well within the company culture, while providing a positive and professional interview experience for all candidates. By presenting each question before asking it and using a clear stop signal, I ensure that the conversation flows naturally and the interview process remains fair and equitable for all candidates.
    `,
  };

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    const configuration = new Configuration({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });

    this.openAIApi = new OpenAIApi(configuration);
  }

  async chatWithCultivateBot(
    conversationId: string,
    userContent: string | null,
  ) {
    const previousMessages = (await this.prisma.message.findMany({
      select: {
        role: true,
        content: true,
      },
      where: {
        conversationId: conversationId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })) satisfies ChatCompletionRequestMessage[];

    const messages: ChatCompletionRequestMessage[] = [this.CULTURAL_FIT_ROLE];

    if (previousMessages.length !== 0 && !userContent) {
      throw new BadRequestException('It is user turn to answer the question');
    }

    if (previousMessages.length === 0 && userContent) {
      throw new Error('It is system turn to ask the question');
    }

    if (previousMessages.length === 0) {
      const question = await this.prisma.conversation
        .findUnique({
          where: {
            id: conversationId,
          },
        })
        .question({
          select: {
            title: true,
            goals: true,
          },
        });

      messages.push({
        role: 'system' as const,
        content: `Question: ${question.title}\nGoals: ${question.goals.join(
          ', ',
        )}`,
      });

      const questionFromBot = `Hi! I'm Cultivate Cultural Fit Bot.\nPlease read the question carefully and think about your answer.\n\n${question.title}`;

      await this.prisma.message.create({
        data: {
          role: 'assistant',
          content: questionFromBot,
          conversationId: conversationId,
        },
      });

      return questionFromBot;
    } else {
      messages.push(
        ...[
          ...previousMessages,
          { role: 'user' as const, content: userContent },
        ],
      );
    }

    let responseContent = '';
    try {
      const response = await this.openAIApi.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: messages,
      });

      responseContent = response.data.choices[0].message.content;

      if (responseContent.includes(this.STOP_SIGNAL)) {
        return "That's all I have for now. Thank you for your time.";
      }
    } catch (error) {
      return null;
    }

    try {
      await this.prisma.$transaction(
        async (tx) => {
          await tx.message.create({
            data: {
              conversationId: conversationId,
              role: 'user',
              content: userContent,
            },
          });

          await tx.message.create({
            data: {
              conversationId: conversationId,
              role: 'assistant',
              content: responseContent,
            },
          });
        },
        {
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        },
      );

      return responseContent;
    } catch (error) {
      return null;
    }
  }

  async createConversationSummary(conversationId: string) {
    const messages = await this.prisma.message.findMany({
      select: {
        role: true,
        content: true,
      },
      where: {
        conversationId: conversationId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const questionGoals = await this.prisma.conversation
      .findUnique({
        where: {
          id: conversationId,
        },
      })
      .question({ select: { goals: true } });

    const conversationMessage = messages
      .map((message) => {
        return `${message.role}: ${message.content}`;
      })
      .reduce((acc, message) => {
        return `${acc}\n${message}`;
      });

    const instructions = `Please summarize the conversation in a few sentences. The summary should include the candidate's strengths and weaknesses, as well as any other relevant information that you think would be useful to the organization. Remember to keep the summary within the predefined goals of the question: ${questionGoals.goals.join(
      ', ',
    )} Conversation: ${conversationMessage}`;

    try {
      const response = await this.openAIApi.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          this.CULTURAL_FIT_ROLE,
          {
            role: 'user' as const,
            content: instructions,
          },
        ],
        temperature: 0,
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      return null;
    }
  }
}
