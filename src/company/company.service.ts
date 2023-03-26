import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import {
  Company,
  CreateOneCompanyArgs,
  DeleteOneCompanyArgs,
  FindManyCompanyArgs,
  FindUniqueCompanyArgs,
  UpdateOneCompanyArgs,
} from 'src/@generated/company';
import { FindManyInterviewArgs, Interview } from 'src/@generated/interview';
import { FindManyQuestionArgs, Question } from 'src/@generated/question';
import { User } from 'src/@generated/user';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(args: FindManyCompanyArgs): Promise<Company[]> {
    return this.prisma.company.findMany(args);
  }

  async findUnique(args: FindUniqueCompanyArgs): Promise<Company> {
    return this.prisma.company.findUnique(args);
  }

  async create(args: CreateOneCompanyArgs): Promise<Company> {
    return this.prisma.company.create(args);
  }

  async update(args: UpdateOneCompanyArgs): Promise<Company> {
    return this.prisma.company.update(args);
  }

  async delete(args: DeleteOneCompanyArgs): Promise<Company> {
    return this.prisma.company.delete(args);
  }

  async interviews(
    company: Company,
    args: FindManyInterviewArgs,
  ): Promise<Interview[]> {
    return this.prisma.company
      .findUnique({ where: { id: company.id } })
      .interviews(args);
  }

  async questions(
    company: Company,
    args: FindManyQuestionArgs,
  ): Promise<Question[]> {
    return this.prisma.company
      .findUnique({ where: { id: company.id } })
      .questions(args);
  }

  async members(company: Company): Promise<User[]> {
    return this.prisma.company
      .findUnique({ where: { id: company.id } })
      .members();
  }
}
