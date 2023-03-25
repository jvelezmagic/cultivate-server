import { registerEnumType } from '@nestjs/graphql';

export enum MessageRole {
  CANDIDATE = 'CANDIDATE',
  COMPANY = 'COMPANY',
}

registerEnumType(MessageRole, {
  name: 'MessageRole',
});
