import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ChecklistsService } from './checklists.service';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import { UpdateChecklistDto } from './dto/update-checklist.dto';
import { Checklist } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@Controller('checklists')
@ApiTags('checklists')
export class ChecklistsController {
  constructor(private readonly checklistsService: ChecklistsService) { }

  @Post()
  async create(@Body() createChecklistDto: CreateChecklistDto) {
    return this.checklistsService.create(createChecklistDto);
  }

  @Get()
  async findAllBySkillId(@Query('skillId') skillId: number): Promise<Checklist[]> {
    return this.checklistsService.findAllByInterest({ id: skillId });
  }

  @Get()
  async findAll() {
    return this.checklistsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.checklistsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateChecklistDto: UpdateChecklistDto) {
    return this.checklistsService.update(+id, updateChecklistDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.checklistsService.remove(+id);
  }
}
