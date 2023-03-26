import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { Company } from 'src/@generated/company';
import { Interview } from 'src/@generated/interview';
import { User } from 'src/@generated/user';

@Injectable()
export class UserService {
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
