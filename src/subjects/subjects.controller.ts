import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SubjectEntity } from './entities/subject.entity';

@Controller('subjects')
@ApiTags('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) { }

  @Post()
  @ApiCreatedResponse({ type: CreateSubjectDto })
  async create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.create(createSubjectDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.subjectsService.findOne({ id: Number(id) });
  }

  @Get()
  async findOneBySkill(@Query('skillId') skillId: string) {
    console.log(skillId)
    return this.subjectsService.findAllBySkillId({ id: Number(skillId) });
  }

  @Get()
  @ApiOkResponse({ type: SubjectEntity, isArray: true })
  async findAll() {
    return this.subjectsService.findAll();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectsService.update({ where: { id: Number(id) }, data: updateSubjectDto });
  }


  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.subjectsService.remove({ id: Number(id) });
  }
}
