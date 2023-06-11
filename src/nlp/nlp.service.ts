import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { env } from 'process';

@Injectable()
export class NlpService {
  constructor(private readonly httpService: HttpService) { }

  create() {
    return 'This action adds a new nlp';
  }

  findAll() {
    return this.httpService.get(env.ML_SERVICE_URL);
  }

  findOne(id: number) {
    return `This action returns a #${id} nlp`;
  }

  update(id: number) {
    return `This action updates a #${id} nlp`;
  }

  remove(id: number) {
    return `This action removes a #${id} nlp`;
  }

  fileUpload() {
    return null;
  }
}
