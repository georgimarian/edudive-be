import { PredefinedSkill, SkillType } from "@prisma/client";

export class PredefinedSkillEntity implements PredefinedSkill {
    id: number;
    name: string;
    type: SkillType;
}
