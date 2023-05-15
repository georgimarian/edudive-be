import { Injectable } from '@nestjs/common';
import { CreateNlpDto } from './dto/create-nlp.dto';
import { UpdateNlpDto } from './dto/update-nlp.dto';

@Injectable()
export class NlpService {
  create(createNlpDto: CreateNlpDto) {
    return 'This action adds a new nlp';
  }

  findAll() {
    return `This action returns all nlp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nlp`;
  }

  update(id: number, updateNlpDto: UpdateNlpDto) {
    return `This action updates a #${id} nlp`;
  }

  remove(id: number) {
    return `This action removes a #${id} nlp`;
  }
}
