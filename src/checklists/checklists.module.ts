import { Module } from '@nestjs/common';
import { ChecklistsService } from './checklists.service';
import { ChecklistsController } from './checklists.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ChecklistsController],
  providers: [ChecklistsService, PrismaService]
})
export class ChecklistsModule { }
