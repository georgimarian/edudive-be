import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Subject, Prisma } from '@prisma/client';

@Injectable()
export class SubjectsService {
  private readonly subjects: Subject[] = [];

  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<Subject[]> {
    return this.prisma.subject.findMany();
  }

  async create(data: Prisma.SubjectCreateInput): Promise<Subject> {
    return this.prisma.subject.create({ data })
  }


  async findOne(subjectUniqueInput: Prisma.SubjectWhereUniqueInput): Promise<Subject> {
    return this.prisma.subject.findUnique({ where: subjectUniqueInput });
  }

  async update(params: {
    where: Prisma.SubjectWhereUniqueInput,
    data: Prisma.SubjectUpdateInput
  }): Promise<Subject> {
    const { data, where } = params;
    return this.prisma.subject.update({
      data, where
    })
  }

  async remove(where: Prisma.SubjectWhereUniqueInput,
  ): Promise<Subject> {
    return this.prisma.subject.delete({ where })
  }
}
