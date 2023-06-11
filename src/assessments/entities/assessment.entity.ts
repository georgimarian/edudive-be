import { ApiProperty } from "@nestjs/swagger";
import { Assessment } from "@prisma/client";

export class AssessmentEntity implements Assessment {
    subjectId: number;
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    finalGradePercentage: number;
}
