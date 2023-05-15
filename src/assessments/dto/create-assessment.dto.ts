import { Assessment } from "@prisma/client";

export class CreateAssessmentDto implements Assessment {
    id: number;
    title: string;
    finalGradePercentage: number;
}
