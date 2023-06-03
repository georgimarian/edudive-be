import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NlpService } from './nlp.service';
import { CreateNlpDto } from './dto/create-nlp.dto';
import { UpdateNlpDto } from './dto/update-nlp.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('nlp')
@ApiTags('nlp')
export class NlpController {
  constructor(private readonly nlpService: NlpService) { }

  @Post()
  create(@Body() createNlpDto: CreateNlpDto) {
    return this.nlpService.create(createNlpDto);
  }

  @Get()
  findAll() {
    return this.nlpService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nlpService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNlpDto: UpdateNlpDto) {
    return this.nlpService.update(+id, updateNlpDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nlpService.remove(+id);
  }
}
