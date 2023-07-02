import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SubjectEntity } from './entities/subject.entity';
import { Subject } from '@prisma/client';

@Controller('subjects')
@ApiTags('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) { }

  @Post()
  @ApiCreatedResponse({ type: CreateSubjectDto })
  async create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.create(createSubjectDto);
  }

  @Get()
  @ApiOkResponse({ type: SubjectEntity, isArray: true })
  async findAll() {
    return this.subjectsService.findAll();
  }

  @Get()
  async findAllBySkill(@Query('skillId') skillId: string) {
    return this.subjectsService.findAllBySkillId({ id: Number(skillId) });
  }

  @Get('byUser')
  async findAllByUser(@Query("firebaseId") userId: string): Promise<Subject[]> {
    return this.subjectsService.findAllByUserId(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.subjectsService.findOne({ id: Number(id) });
  }


  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto): Promise<Subject> {
    return this.subjectsService.update({ where: { id: Number(id) }, data: updateSubjectDto });
  }


  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.subjectsService.remove({ id: Number(id) });
  }
}
