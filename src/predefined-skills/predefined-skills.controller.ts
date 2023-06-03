import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PredefinedSkillsService } from './predefined-skills.service';
import { PredefinedSkillDto } from './dto/predefined-skill.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PredefinedSkillEntity } from './entities/predefined-skill.entity';

@Controller('predefined-skills')
@ApiTags('predefined-skills')
export class PredefinedSkillsController {
  constructor(private readonly predefinedSkillsService: PredefinedSkillsService) { }

  @Post()
  @ApiCreatedResponse({ type: PredefinedSkillDto })
  create(@Body() createPredefinedSkillDto: PredefinedSkillDto) {
    return this.predefinedSkillsService.create(createPredefinedSkillDto);
  }

  @Get()
  @ApiOkResponse({ type: PredefinedSkillEntity, isArray: true })
  findAll() {
    return this.predefinedSkillsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.predefinedSkillsService.findOne({ id: Number(id) });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePredefinedSkillDto: PredefinedSkillDto) {
    return this.predefinedSkillsService.update({ where: { id: Number(id) }, data: updatePredefinedSkillDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.predefinedSkillsService.remove({ id: Number(id) });
  }
}
