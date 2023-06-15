import { Injectable } from '@nestjs/common';
import { Skill, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SkillsService {
  private readonly skills: Skill[] = [];

  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.SkillCreateInput): Promise<Skill> {
    return this.prisma.skill.create({ data });
  }

  async findAll(): Promise<Skill[]> {
    return this.prisma.skill.findMany();
  }

  // TODO: see here
  async findAllByUserId(userId: string) {
    return this.prisma.skill.findMany({
      where: {
        StudentToSkill: {
          some: {
            student: {
              firebaseId: userId
            }
          }
        }
      },
      // include: { StudentToSkill: true }
    });
  }

  async findOne(skillUniqueInput: Prisma.SkillWhereUniqueInput): Promise<Skill> {
    return this.prisma.skill.findUnique({ where: skillUniqueInput });
  }

  async update(params: {
    where: Prisma.SkillWhereUniqueInput,
    data: Prisma.SkillUpdateInput
  }): Promise<Skill> {
    const { data, where } = params;
    return this.prisma.skill.update({ data, where });
  }

  async remove(where: Prisma.SkillWhereUniqueInput): Promise<Skill> {
    return this.prisma.skill.delete({ where });
  }
}
