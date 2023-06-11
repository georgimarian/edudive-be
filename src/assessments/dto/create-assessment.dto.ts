import { Assessment } from "@prisma/client";

export class CreateAssessmentDto implements Assessment {
    subjectId: number;
    id: number;
    title: string;
    description: string;
    finalGradePercentage: number;
    completed: boolean;
}
