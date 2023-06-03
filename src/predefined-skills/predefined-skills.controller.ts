import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PredefinedSkillsService } from './predefined-skills.service';
import { PredefinedSkillDto } from './dto/predefined-skill.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PredefinedSkillEntity } from './entities/predefined-skill.entity';
import { SkillType } from '@prisma/client';

@Controller('predefined-skills')
@ApiTags('predefined-skills')
export class PredefinedSkillsController {
  constructor(private readonly predefinedSkillsService: PredefinedSkillsService) { }

  @Post()
  @ApiCreatedResponse({ type: PredefinedSkillDto })
  async create(@Body() createPredefinedSkillDto: PredefinedSkillDto) {
    return this.predefinedSkillsService.create(createPredefinedSkillDto);
  }

  @Get()
  async findAllByType(@Query('type') type: SkillType) {
    return this.predefinedSkillsService.findAllByType(type)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.predefinedSkillsService.findOne({ id: Number(id) });
  }

  @Get()
  @ApiOkResponse({ type: PredefinedSkillEntity, isArray: true })
  async findAll() {
    return this.predefinedSkillsService.findAll();
  }


  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePredefinedSkillDto: PredefinedSkillDto) {
    return this.predefinedSkillsService.update({ where: { id: Number(id) }, data: updatePredefinedSkillDto });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.predefinedSkillsService.remove({ id: Number(id) });
  }
}
