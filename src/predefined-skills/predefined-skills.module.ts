import { Module } from '@nestjs/common';
import { PredefinedSkillsService } from './predefined-skills.service';
import { PredefinedSkillsController } from './predefined-skills.controller';

@Module({
  controllers: [PredefinedSkillsController],
  providers: [PredefinedSkillsService]
})
export class PredefinedSkillsModule {}
