import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { Challenge } from '@prisma/client';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateChallengeDto } from './dto/create-challenge.dto';

@Controller('challenges')
@ApiTags('badges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) { }

  @Post()
  @ApiCreatedResponse({ type: CreateChallengeDto })
  async create(@Body() createChallengeDto): Promise<Challenge> {
    return this.challengesService.create(createChallengeDto);
  }

  @Get()
  @ApiOkResponse()
  async findAll(
    @Query('firebaseId') firebaseId: string,
    @Query("skillId") skillId: number,
    @Query("filters") filters
  ) {
    const result = await this.challengesService.findAllByUser(firebaseId, Number(skillId), filters);
    return result.map(challenge => ({
      completed: challenge.completed,
      id: challenge.id,
      name: challenge.name,
      color: challenge.skill?.StudentToSkill?.[0].color || ''
    }));
  }

  @Get(':id')
  @ApiOkResponse()
  async findOne(@Param('id') id: string): Promise<Challenge> {
    return this.challengesService.findOne(Number(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateChallengeDto })
  async update(
    @Param('id') id: string,
    @Body() updateChallengeDto: UpdateChallengeDto
  ): Promise<Challenge> {
    return this.challengesService.update(Number(id), updateChallengeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Challenge> {
    return this.challengesService.remove(Number(id));
  }
}
