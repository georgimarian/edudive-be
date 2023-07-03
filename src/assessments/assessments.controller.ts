import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AssessmentsService } from './assessments.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Assessment } from '@prisma/client';
import { AssessmentEntity } from './entities/assessment.entity';

interface AssessmentFilter {
  completed?: boolean;
  not_completed?: boolean;
  all?: boolean;
  coming_up?: boolean;
}
@Controller('assessments')
@ApiTags('assessments')
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) { }

  @Post()
  @ApiCreatedResponse({ type: AssessmentEntity })
  async create(@Body() createAssessmentDto: CreateAssessmentDto) {
    return this.assessmentsService.create(createAssessmentDto);
  }

  @Get()
  @ApiOkResponse({ type: AssessmentEntity })
  async findByStatus
    (
      @Query('skill') skillId: string,
      @Query('completed') completed: boolean,
      @Query('firebaseId') firebaseId: string,
      @Query('filters') filters: AssessmentFilter
    ): Promise<Assessment[]> {
    if (completed)
      return this.assessmentsService.findByStatus(Boolean(completed));
    if (skillId)
      return this.assessmentsService.findBySkill(Number(skillId), filters);
    if (firebaseId)
      return this.assessmentsService.findByUser(firebaseId, { completed: false });
  }

  @Get()
  @ApiOkResponse({ type: AssessmentEntity, isArray: true })
  async findAll(): Promise<Assessment[]> {
    return this.assessmentsService.findAll();
  }


  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Assessment> {
    return this.assessmentsService.findOne({ id: Number(id) });
  }

  @Patch()
  async update(
    @Query('id') id: string,
    @Body() updateAssessmentDto: UpdateAssessmentDto
  ): Promise<Assessment> {
    return this.assessmentsService.update({
      where: { id: Number(id) },
      data: updateAssessmentDto
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Assessment> {
    return this.assessmentsService.remove({ id: Number(id) });
  }
}
