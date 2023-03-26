import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { Company } from 'src/@generated/company';
import { FindManyInterviewArgs, Interview } from 'src/@generated/interview';
import {
  CreateOneUserArgs,
  DeleteOneUserArgs,
  FindManyUserArgs,
  FindUniqueUserArgs,
  UpdateOneUserArgs,
  User,
} from 'src/@generated/user';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(args: FindManyUserArgs): Promise<User[]> {
    return this.prisma.user.findMany(args);
  }

  async findUnique(args: FindUniqueUserArgs): Promise<User> {
    return this.prisma.user.findUnique(args);
  }

  async create(args: CreateOneUserArgs): Promise<User> {
    return this.prisma.user.create(args);
  }

  async update(args: UpdateOneUserArgs): Promise<User> {
    return this.prisma.user.update(args);
  }

  async delete(args: DeleteOneUserArgs): Promise<User> {
    return this.prisma.user.delete(args);
  }

  async company(user: User): Promise<Company> {
    return this.prisma.user
      .findUnique({
        where: { id: user.id },
      })
      .company();
  }

  async interviews(
    user: User,
    args: FindManyInterviewArgs,
  ): Promise<Interview[]> {
    return this.prisma.user
      .findUnique({
        where: { id: user.id },
      })
      .interviews(args);
  }
}
