import { ApiProperty } from "@nestjs/swagger";
import { Skill, SkillType } from "@prisma/client";

export class SkillEntity implements Skill {
    @ApiProperty()
    predefinedSkillId: number;
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    type: SkillType;

    @ApiProperty()
    color: string;
}
