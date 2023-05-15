import { Skill, SkillType } from "@prisma/client";

export class CreateSkillDto implements Skill {
    id: number;
    name: string;
    type: SkillType;
}
