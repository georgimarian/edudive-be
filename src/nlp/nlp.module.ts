import { Module } from '@nestjs/common';
import { NlpService } from './nlp.service';
import { NlpController } from './nlp.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [NlpController],
  providers: [NlpService, PrismaService]
})
export class NlpModule { }
