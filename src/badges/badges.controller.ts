import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BadgesService } from './badges.service';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { UpdateBadgeDto } from './dto/update-badge.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('badges')
@ApiTags('badges')
export class BadgesController {
  constructor(private readonly badgesService: BadgesService) { }

  @Post()
  async create(@Body() createBadgeDto: CreateBadgeDto) {
    return this.badgesService.create(createBadgeDto);
  }

  @Get()
  async findAll() {
    return this.badgesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.badgesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBadgeDto: UpdateBadgeDto) {
    return this.badgesService.update({ where: { id: Number(id) }, data: updateBadgeDto });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.badgesService.remove({ id: Number(id) });
  }
}
