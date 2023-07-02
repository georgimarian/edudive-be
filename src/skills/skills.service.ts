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
  async findAllByUserId(userId: string, detailed: boolean) {
    return detailed ? this.prisma.skill.findMany({
      where: {
        StudentToSkill: {
          some: {
            student: {
              firebaseId: userId
            }
          }
        }
      },
      include: {
        steps: {
          // include: {
          //   step: true,
          // },
          select: {
            step: true,
          }
        }
      }
    }) : this.prisma.skill.findMany({
      where: {
        StudentToSkill: {
          some: {
            student: {
              firebaseId: userId
            }
          }
        }
      },
    });
  }

  async findOne(skillUniqueInput: Prisma.SkillWhereUniqueInput) {
    return this.prisma.skill.findUnique({
      where: skillUniqueInput,
      include: {
        steps: {
          select: {
            step: {
              select: {
                id: true,
                description: true,
                nextSteps: true,
                previousSteps: true,
                subjects: true,
              }
            }
          }
        },
      }
    });
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
