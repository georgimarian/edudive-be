import { Injectable } from '@nestjs/common';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { PrismaService } from 'src/prisma.service';
import { Challenge, Prisma } from '@prisma/client';


@Injectable()
export class ChallengesService {
  private readonly assessments: Challenge[] = [];

  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.ChallengeCreateInput): Promise<Challenge> {
    return this.prisma.challenge.create({ data });
  }

  async findAllByUser(firebaseId: string, skillId: number, filters = {}) {
    if (skillId > 0)
      return this.prisma.challenge.findMany({
        where: {
          AND: [
            { skillId: skillId },
            {
              ChallengeOnStudent: {
                some: {
                  user: {
                    firebaseId: firebaseId,

                  }
                }
              }
            }],
          completed: false,
        }
      });

    return this.prisma.challenge.findMany({
      where: {
        AND: [{
          ChallengeOnStudent: {
            some: {
              user: {
                firebaseId: firebaseId,

              }
            }
          }
        }, {
          skill: {
            StudentToSkill: {
              some: {
                student: {
                  firebaseId: firebaseId
                }
              }
            }
          }
        }]
        ,
        completed: false,
      },
      include: { skill: { select: { color: true } } }
    });
  }

  async findAll(): Promise<Challenge[]> {
    return this.prisma.challenge.findMany();
  }

  async findOne(id: number): Promise<Challenge> {
    return this.prisma.challenge.findFirst({
      where: {
        id: id
      }
    });
  }

  async update(id: number, updateChallengeDto: UpdateChallengeDto) {
    return this.prisma.challenge.update({
      where: {
        id: id,
      },
      data: updateChallengeDto
    });
  }

  async remove(id: number) {
    return this.prisma.challenge.delete({ where: { id: id } });
  }
}
