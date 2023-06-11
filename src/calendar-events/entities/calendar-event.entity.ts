import { ApiProperty } from '@nestjs/swagger';
import { CalendarEvent, EventType } from '@prisma/client';


export class CalendarEventEntity implements CalendarEvent {
    type: EventType;
    subjectId: number;
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    date: Date;
}
