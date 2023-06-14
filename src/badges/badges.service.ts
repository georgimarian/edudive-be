import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Badge, Prisma } from '@prisma/client';


@Injectable()
export class BadgesService {
  private readonly badges: Badge[];

  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.BadgeCreateInput): Promise<Badge> {
    return this.prisma.badge.create({ data });
  }

  async findAll(): Promise<Badge[]> {
    return this.prisma.badge.findMany();
  }

  async findOne(firebaseId: string): Promise<Badge> {
    return this.prisma.badge.findFirst({
      where: {
        filename: firebaseId
      }
    });
  }

  async update(params: {
    where: Prisma.BadgeWhereUniqueInput;
    data: Prisma.BadgeUpdateInput
  }): Promise<Badge> {
    const { data, where } = params;
    return this.prisma.badge.update({
      data, where
    })
  }

  async remove(where: Prisma.BadgeWhereUniqueInput): Promise<Badge> {
    return this.prisma.badge.delete({ where });
  }
}
