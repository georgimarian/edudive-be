import { Controller, Get, Param, Delete, UseInterceptors, UploadedFile, Post } from '@nestjs/common';
import { NlpService } from './nlp.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadDto } from './dto/fileUpload.dto';
import { diskStorage } from 'multer';

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


  //   @Post('/file')
  //   @UseInterceptors(FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: './uploadedFiles'
  //     })
  //   }))
  //   @ApiConsumes('multipart/form-data')
  //   @ApiBody({
  //     description: 'Letter of intent',
  //     type: FileUploadDto,
  //   })
  //   async uploadFile(@UploadedFile() file: Express.Multer.File) {
  //     console.log(file)
  //   }
  // 
}
