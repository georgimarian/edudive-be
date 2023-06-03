import { Module } from '@nestjs/common';
import { PredefinedSkillsService } from './predefined-skills.service';
import { PredefinedSkillsController } from './predefined-skills.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [PredefinedSkillsController],
  providers: [PredefinedSkillsService, PrismaService]
})
export class PredefinedSkillsModule { }
