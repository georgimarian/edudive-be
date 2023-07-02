import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BadgesService } from './badges.service';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { UpdateBadgeDto } from './dto/update-badge.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Badge } from '@prisma/client';

@Controller('badges')
@ApiTags('badges')
export class BadgesController {
  constructor(private readonly badgesService: BadgesService) { }

  @Post()
  @ApiCreatedResponse({ type: CreateBadgeDto })
  async create(@Body() createBadgeDto: CreateBadgeDto): Promise<Badge> {
    return this.badgesService.create(createBadgeDto);
  }

  @Get()
  @ApiOkResponse({ type: CreateBadgeDto })
  async findOne(@Query('firebaseId') id: string): Promise<Badge[]> {
    return this.badgesService.findAllByUser(id);
  }

  @Get()
  @ApiOkResponse({ type: CreateBadgeDto, isArray: true })
  async findAll(): Promise<Badge[]> {
    return this.badgesService.findAll();
  }


  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBadgeDto: UpdateBadgeDto
  ): Promise<Badge> {
    return this.badgesService.update({
      where: { id: Number(id) },
      data: updateBadgeDto
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Badge> {
    return this.badgesService.remove({ id: Number(id) });
  }
}
