import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
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
  async findByUser(@Query("userId") userId: string, @Query("detailed") detailed = false) {
    if (!detailed) {
      return this.skillsService.findAllByUserId(userId, detailed);
    }
    const result = await this.skillsService.findAllByUserId(userId, detailed);
    return result.map(skill => (
      {
        id: skill.id,
        color: skill.StudentToSkill.color,
        name: skill.name,
        type: skill.type,
        steps: skill.steps.map(({ step }) => step)
      }))
  }

  @Get('/findOne')
  async findOne(@Query('id') id: string) {
    const result = await this.skillsService.findOne({ id: Number(id) });

    const nodes = result.steps.map(({ step }, idx) => ({
      id: step.id,
      name: step.description,
      completed: idx === result.steps.length - 1 ? false : true,
    }))

    const links = result.steps.reduce((acc, { step }) => {
      const nextStepsMap = step.nextSteps.map((nextStep) => ({
        source: step?.id,
        target: nextStep?.id,
        subject: step?.subjects?.[0] ? step.subjects[0].name : '',
      }));

      return [...acc, ...nextStepsMap];
    }, []);

    const nodeIds = nodes.map(node => node.id)

    return ({
      nodes: nodes,
      links: links.filter(link => nodeIds.includes(link.source) && nodeIds.includes(link.target))
    });
  }

  @Get()
  async findAll() {
    return this.skillsService.findAll();
  }


  @Patch('/update')
  async update(@Query('id') id: string, @Query('firebaseId') firebaseId: string, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillsService.update({
      where: { id: Number(id) },
      data: updateSkillDto,
      firebaseId: firebaseId
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.skillsService.remove({ id: Number(id) });
  }
}
