import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CalendarEvent, Prisma } from '@prisma/client';

@Injectable()
export class CalendarEventsService {
  private readonly calendarEvents: CalendarEvent[] = [];

  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.CalendarEventCreateInput): Promise<CalendarEvent> {
    return this.prisma.calendarEvent.create({ data });
  }

  async findAll(): Promise<CalendarEvent[]> {
    return this.prisma.calendarEvent.findMany();
  }

  async findOne(calendarEventUniqueInput: Prisma.CalendarEventWhereUniqueInput): Promise<CalendarEvent> {
    return this.prisma.calendarEvent.findUnique({ where: calendarEventUniqueInput });
  }

  async update(params: {
    where: Prisma.CalendarEventWhereUniqueInput,
    data: Prisma.CalendarEventUpdateInput
  }): Promise<CalendarEvent> {
    const { data, where } = params;
    return this.prisma.calendarEvent.update({ data, where });
  }

  async remove(where: Prisma.CalendarEventWhereUniqueInput): Promise<CalendarEvent> {
    return this.prisma.calendarEvent.delete({ where });
  }
}
