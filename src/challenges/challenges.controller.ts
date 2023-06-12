import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { UpdateChallengeDto } from './dto/update-challenge.dto';

@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) { }

  @Post()
  create(@Body() createChallengeDto) {
    return this.challengesService.create(createChallengeDto);
  }

  @Get()
  findAll(@Query('firebaseId') firebaseId: string, @Query("filters") filters) {
    console.log(firebaseId, filters)
    return this.challengesService.findAllByUser(firebaseId, filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.challengesService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChallengeDto: UpdateChallengeDto) {
    return this.challengesService.update(Number(id), updateChallengeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.challengesService.remove(+id);
  }
}
