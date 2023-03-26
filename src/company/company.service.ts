import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { Company } from 'src/@generated/company';
import { Interview } from 'src/@generated/interview';
import { Question } from 'src/@generated/question';
import { User } from 'src/@generated/user';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(): Promise<Company[]> {
    return this.prisma.company.findMany();
  }

  async companyMembers(companyId: string): Promise<User[]> {
    return this.prisma.company
      .findUnique({
        where: { id: companyId },
      })
      .members();
  }

  async questions(companyId: string): Promise<Question[]> {
    return this.prisma.company
      .findUnique({
        where: { id: companyId },
      })
      .questions();
  }

  async inteviews(companyId: string): Promise<Interview[]> {
    return this.prisma.company
      .findUnique({
        where: { id: companyId },
      })
      .interviews();
  }
}
