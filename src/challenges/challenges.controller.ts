import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { Challenge } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@Controller('challenges')
@ApiTags('badges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) { }

  @Post()
  async create(@Body() createChallengeDto): Promise<Challenge> {
    return this.challengesService.create(createChallengeDto);
  }

  @Get()
  async findAll(@Query('firebaseId') firebaseId: string, @Query("skillId") skillId: number, @Query("filters") filters): Promise<Challenge[]> {
    console.log(firebaseId, filters)
    return this.challengesService.findAllByUser(firebaseId, Number(skillId), filters);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Challenge> {
    return this.challengesService.findOne(Number(id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateChallengeDto: UpdateChallengeDto): Promise<Challenge> {
    return this.challengesService.update(Number(id), updateChallengeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Challenge> {
    return this.challengesService.remove(Number(id));
  }
}
