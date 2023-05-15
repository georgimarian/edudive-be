import { ApiProperty } from "@nestjs/swagger";
import { Assessment } from "@prisma/client";

export class AssessmentEntity implements Assessment {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    finalGradePercentage: number;
}
