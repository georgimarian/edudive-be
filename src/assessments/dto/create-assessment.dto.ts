import { Assessment } from "@prisma/client";

export class CreateAssessmentDto implements Assessment {
    subjectId: number;
    id: number;
    title: string;
    finalGradePercentage: number;
}
