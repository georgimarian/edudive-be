import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PredefinedSkill, Prisma } from '@prisma/client';

@Injectable()
export class PredefinedSkillsService {
  private readonly predefinedSkills: PredefinedSkill[] = [];
  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.PredefinedSkillCreateInput): Promise<PredefinedSkill> {
    return this.prisma.predefinedSkill.create({ data });
  }

  async findAll(): Promise<PredefinedSkill[]> {
    return this.prisma.predefinedSkill.findMany();
  }

  async findOne(predefinedSkillUniqueInput: Prisma.PredefinedSkillWhereUniqueInput) {
    return this.prisma.subject.findUnique({ where: predefinedSkillUniqueInput });
  }

  async update(params: {
    where: Prisma.PredefinedSkillWhereUniqueInput,
    data: Prisma.PredefinedSkillUpdateInput
  }): Promise<PredefinedSkill> {
    const { data, where } = params;
    return this.prisma.predefinedSkill.update({ data, where })
  }

  async remove(where: Prisma.PredefinedSkillWhereUniqueInput,
  ): Promise<PredefinedSkill> {
    return this.prisma.predefinedSkill.delete({ where })
  }
}
