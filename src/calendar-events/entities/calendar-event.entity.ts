import { ApiProperty } from '@nestjs/swagger';
import { CalendarEvent } from '@prisma/client';


export class CalendarEventEntity implements CalendarEvent {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    date: Date;
}
