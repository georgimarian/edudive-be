import { Skill, SkillType } from "@prisma/client";

export class CreateSkillDto implements Skill {
    predefinedSkillId: number;
    id: number;
    name: string;
    type: SkillType;
    color: string;
}
