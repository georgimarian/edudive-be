import { Injectable } from '@nestjs/common';
import { UpdateChecklistDto } from './dto/update-checklist.dto';
import { PrismaService } from 'src/prisma.service';
import { Checklist, Prisma } from '@prisma/client';


@Injectable()
export class ChecklistsService {
  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.ChecklistCreateInput): Promise<Checklist> {
    return this.prisma.checklist.create({ data });
  }

  async findAll(): Promise<Checklist[]> {
    return this.prisma.checklist.findMany();
  }

  async findAllByInterest(data: Prisma.SkillWhereUniqueInput): Promise<Checklist[]> {
    return this.prisma.checklist.findMany({
      where: {
        skillId: Number(data.id),
      }
    })
  }

  async findOne(id: number): Promise<Checklist> {
    return this.prisma.checklist.findFirst({ where: { id: id } });
  }

  async update(id: number, checked: boolean): Promise<Checklist> {
    console.log(id, checked)
    return this.prisma.checklist.update({
      where: { id: id },
      data: {
        checked: checked
      }
    });
  }

  async remove(id: number): Promise<Checklist> {
    return this.prisma.checklist.delete({ where: { id: id } });
  }
}
