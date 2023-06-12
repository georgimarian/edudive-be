import { Injectable } from '@nestjs/common';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import { UpdateChecklistDto } from './dto/update-checklist.dto';
import { PrismaService } from 'src/prisma.service';
import { Checklist, Prisma } from '@prisma/client';


@Injectable()
export class ChecklistsService {
  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.ChecklistCreateInput) {
    return this.prisma.checklist.create({ data });
  }

  async findAll() {
    return this.prisma.checklist.findMany();
  }

  async findAllByInterest(data: Prisma.SkillWhereUniqueInput) {
    return this.prisma.checklist.findMany({
      where: {
        skillId: Number(data.id),
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} checklist`;
  }

  update(id: number, updateChecklistDto: UpdateChecklistDto) {
    return `This action updates a #${id} checklist`;
  }

  remove(id: number) {
    return `This action removes a #${id} checklist`;
  }
}
