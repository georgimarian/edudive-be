import { Injectable } from '@nestjs/common';
import { Skill, Prisma, StudentOnSkill } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdateSkillDto } from './dto/update-skill.dto';

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

  async findAllByUserId(userId: string, detailed: boolean): Promise<
    (
      Skill & {
        steps?: { step: { id: number, description: string } }[]
      } & {
        StudentToSkill?: {
          color: string;
        }
      }
    )[]
  > {
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
          select: {
            step: true,
          }
        },
        StudentToSkill: {
          select: {
            color: true
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
    data: UpdateSkillDto,
    firebaseId: string,
  }): Promise<StudentOnSkill> {
    const { data, where, firebaseId } = params;
    const student = await this.prisma.user.findFirst({ where: { firebaseId: firebaseId } })

    console.log('student', student);
    return this.prisma.studentOnSkill.update({
      where: {
        studentId_skillId: { studentId: student.id, skillId: where.id }
      },
      data: {
        color: data.color
      }
    });
  }

  async remove(where: Prisma.SkillWhereUniqueInput): Promise<Skill> {
    return this.prisma.skill.delete({ where });
  }
}
