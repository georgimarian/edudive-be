import { Injectable } from '@nestjs/common';
import { Assessment, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AssessmentsService {
  private readonly assessments: Assessment[] = [];

  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.AssessmentCreateInput): Promise<Assessment> {
    return this.prisma.assessment.create({ data });
  }

  async findAll(): Promise<Assessment[]> {
    return this.prisma.assessment.findMany();
  }

  async findOne(assessmentUniqueInput: Prisma.AssessmentWhereUniqueInput): Promise<Assessment> {
    return this.prisma.assessment.findUnique({ where: assessmentUniqueInput });
  }

  async update(params: {
    where: Prisma.AssessmentWhereUniqueInput,
    data: Prisma.AssessmentUpdateInput
  }) {
    const { data, where } = params;
    return this.prisma.assessment.update({
      data, where
    });
  }

  async remove(where: Prisma.AssessmentWhereUniqueInput): Promise<Assessment> {
    return this.prisma.assessment.delete({ where });
  }
}
