import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { MessageService } from './message.service';

import { Conversation } from 'src/@generated/conversation';
import {
  CreateOneMessageArgs,
  DeleteOneMessageArgs,
  FindManyMessageArgs,
  FindUniqueMessageArgs,
  Message,
  UpdateOneMessageArgs,
} from 'src/@generated/message';

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Query(() => [Message])
  async messages(@Args() args: FindManyMessageArgs): Promise<Message[]> {
    return this.messageService.findMany(args);
  }

  @Query(() => Message, { nullable: true })
  async message(@Args() args: FindUniqueMessageArgs): Promise<Message> {
    return this.messageService.findUnique(args);
  }

  @Mutation(() => Message)
  async createMessage(@Args() args: CreateOneMessageArgs): Promise<Message> {
    return this.messageService.create(args);
  }

  @Mutation(() => Message)
  async updateMessage(@Args() args: UpdateOneMessageArgs): Promise<Message> {
    return this.messageService.update(args);
  }

  @Mutation(() => Message)
  async deleteMessage(@Args() args: DeleteOneMessageArgs): Promise<Message> {
    return this.messageService.delete(args);
  }

  @ResolveField(() => Conversation)
  async conversation(@Parent() message: Message): Promise<Conversation> {
    return this.messageService.conversation(message);
  }
}
