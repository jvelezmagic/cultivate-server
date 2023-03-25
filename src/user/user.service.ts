import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { Interview } from 'src/interview/models/interview.model';
import { Company } from '../company/models/company.model';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async company(userId: string): Promise<Company | null> {
    return this.prisma.user
      .findUnique({
        where: { id: userId },
      })
      .company();
  }

  async interviews(userId: string): Promise<Interview[]> {
    return this.prisma.user
      .findUnique({
        where: { id: userId },
      })
      .interviews();
  }
}
