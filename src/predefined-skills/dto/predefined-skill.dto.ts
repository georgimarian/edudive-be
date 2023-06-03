import { SkillType } from "@prisma/client";

export class PredefinedSkillDto {
    name: string;
    type: SkillType;
}
