import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) { }

  @Post()
  async create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.create(createSubjectDto);
  }

  @Get()
  async findAll() {
    return this.subjectsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.subjectsService.findOne({ id: Number(id) });
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
