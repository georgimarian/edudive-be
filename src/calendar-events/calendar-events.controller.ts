import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CalendarEventsService } from './calendar-events.service';
import { CreateCalendarEventDto } from './dto/create-calendar-event.dto';
import { UpdateCalendarEventDto } from './dto/update-calendar-event.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CalendarEventEntity } from './entities/calendar-event.entity';
import { CalendarEvent } from '@prisma/client';

@Controller('calendar-events')
@ApiTags('calendar-events')
export class CalendarEventsController {
  constructor(private readonly calendarEventsService: CalendarEventsService) { }

  @Post()
  @ApiCreatedResponse({ type: CalendarEventEntity })
  async create(@Body() createCalendarEventDto: CreateCalendarEventDto) {
    return this.calendarEventsService.create(createCalendarEventDto);
  }

  @Get()
  @ApiOkResponse({ type: CalendarEventEntity, isArray: true })
  async findAll(): Promise<CalendarEvent[]> {
    return this.calendarEventsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: CalendarEventEntity })
  async findOne(@Param('id') id: string): Promise<CalendarEvent> {
    return this.calendarEventsService.findOne({ id: Number(id) });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCalendarEventDto: UpdateCalendarEventDto) {
    return this.calendarEventsService.update({ where: { id: Number(id) }, data: updateCalendarEventDto });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.calendarEventsService.remove({ id: Number(id) });
  }
}
