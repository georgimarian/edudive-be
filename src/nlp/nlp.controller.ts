import { Controller, Get, Param, Delete, UseInterceptors, UploadedFile, Post, Query, Body } from '@nestjs/common';
import { NlpService } from './nlp.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadDto } from './dto/fileUpload.dto';

@Controller('nlp')
@ApiTags('nlp')
export class NlpController {
  constructor(private readonly nlpService: NlpService) { }


  @Get()
  findAll() {
    return this.nlpService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nlpService.findOne(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nlpService.remove(+id);
  }

  @Post()
  async postInformation(
    @Query('firebaseId') id: string,
    @Body() data: {
      subjects: string[];
      hardSkills: string;
      softSkills: string;
    }
  ) {
    const { subjects, hardSkills, softSkills } = data;
    return await this.nlpService.saveUserPreferences(id, softSkills, hardSkills);
  }


  @Post('/file')
  @UseInterceptors(FileInterceptor('file',
  ))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Letter of intent',
    type: FileUploadDto,
  })
  async uploadFile(@Query('firebaseId') id: string, @UploadedFile() file: Express.Multer.File) {
    const addedSkills = this.nlpService.uploadFile(file, id);
    return addedSkills;
  }

}
