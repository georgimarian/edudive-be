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

  findAllByUser(firebaseId: string, filters): Promise<Challenge[]> {
    return this.prisma.challenge.findMany({
      where: {

      }
    });
  }

  findAll(): Promise<Challenge[]> {
    return this.prisma.challenge.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} challenge`;
  }

  update(id: number, updateChallengeDto: UpdateChallengeDto) {
    return `This action updates a #${id} challenge`;
  }

  remove(id: number) {
    return `This action removes a #${id} challenge`;
  }
}
