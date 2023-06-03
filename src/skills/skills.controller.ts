import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@Controller('skills')
@ApiTags('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) { }

  @Post()
  async create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillsService.create(createSkillDto);
  }

  @Get()
  async findAll() {
    return this.skillsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Skill> {
    return this.skillsService.findOne({ id: Number(id) });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillsService.update({ where: { id: Number(id) }, data: updateSkillDto });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.skillsService.remove({ id: Number(id) });
  }
}
