import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaModule } from 'nestjs-prisma';

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { CompanyModule } from './company/company.module';
import { ConversationModule } from './conversation/conversation.module';
import { InterviewModule } from './interview/interview.module';
import { MessageModule } from './message/message.module';
import { QuestionModule } from './question/question.module';
import { UsersModule } from './user/user.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CulturalFitBotModule } from './cultural-fit-bot/cultural-fit-bot.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get('HTTP_TIMEOUT', 5000),
        maxRedirects: configService.get('HTTP_MAX_REDIRECTS', 5),
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: false,
      introspection: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    UsersModule,
    CompanyModule,
    QuestionModule,
    InterviewModule,
    ConversationModule,
    MessageModule,
    CulturalFitBotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
