import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ChecklistsService } from './checklists.service';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import { UpdateChecklistDto } from './dto/update-checklist.dto';
import { Checklist } from '@prisma/client';

@Controller('checklists')
export class ChecklistsController {
  constructor(private readonly checklistsService: ChecklistsService) { }

  @Post()
  create(@Body() createChecklistDto: CreateChecklistDto) {
    return this.checklistsService.create(createChecklistDto);
  }

  @Get()
  async findAllBySkillId(@Query('skillId') skillId: number): Promise<Checklist[]> {
    return this.checklistsService.findAllByInterest({ id: skillId });
  }

  @Get()
  findAll() {
    return this.checklistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checklistsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChecklistDto: UpdateChecklistDto) {
    return this.checklistsService.update(+id, updateChecklistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checklistsService.remove(+id);
  }
}
