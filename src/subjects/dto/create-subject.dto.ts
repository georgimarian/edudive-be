import { ApiProperty } from "@nestjs/swagger";
import { Subject } from "@prisma/client";

export class CreateSubjectDto implements Subject {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    descriptiveLink: string;
}
