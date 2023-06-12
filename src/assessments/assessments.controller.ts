import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AssessmentsService } from './assessments.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';
import { ApiTags } from '@nestjs/swagger';
import { Assessment } from '@prisma/client';

@Controller('assessments')
@ApiTags('assessments')
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) { }

  @Post()
  async create(@Body() createAssessmentDto: CreateAssessmentDto) {
    return this.assessmentsService.create(createAssessmentDto);
  }

  @Get()
  async findAll() {
    return this.assessmentsService.findAll();
  }

  @Get()
  async findBySubject(@Query('subject') subject: string): Promise<Assessment[]> {
    return this.assessmentsService.findBySubject(subject);

  }

  @Get()
  async findByStatus(@Query('completed') completed: boolean): Promise<Assessment[]> {
    return this.assessmentsService.findByStatus(completed);

  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.assessmentsService.findOne({ id: Number(id) });
  }

  @Patch()
  async update(@Query('id') id: string, @Body() updateAssessmentDto: UpdateAssessmentDto) {
    console.log("here", id)
    return this.assessmentsService.update({ where: { id: Number(id) }, data: updateAssessmentDto });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.assessmentsService.remove({ id: Number(id) });
  }
}
