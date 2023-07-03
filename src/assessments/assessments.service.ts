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

  async findBySkill(skillId: number, firebaseId: string, filters: any = {}): Promise<Assessment[]> {
    return this.prisma.assessment.findMany({
      where: {
        AND: [
          {
            Subject: {
              skills: {
                some: {
                  skill: {
                    id: skillId
                  },
                }
              }
            }
          },
          {
            Subject: {
              skills: {
                some: {
                  skill: {
                    StudentToSkill: {
                      some: {
                        student: {
                          firebaseId: firebaseId
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          {
            completed: filters.completed
              ? Boolean(filters.completed)
              : (filters['not_completed']
                ? !Boolean(filters['not_completed']) : undefined)
          }
        ]
      }
    })
  }

  async findByStatus(completed: boolean): Promise<Assessment[]> {
    return this.prisma.assessment.findMany({
      where: {
        completed: completed
      }
    })
  }

  async findByUser(userId: string, filters = {}): Promise<Assessment[]> {
    return this.prisma.assessment.findMany({
      where: {
        Subject: {
          skills: {
            some: {
              skill: {
                StudentToSkill: {
                  some: {
                    student: {
                      firebaseId: userId
                    }
                  }
                }
              }
            }
          }
        },
        ...filters
      }
    })
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
