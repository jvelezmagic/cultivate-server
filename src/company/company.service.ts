import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { Interview } from 'src/interview/models/interview.model';
import { Question } from 'src/question/models/question.model';
import { User } from 'src/user/models/user.model';
import { Company } from './models/company.model';

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
