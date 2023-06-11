import { Module } from '@nestjs/common';
import { NlpService } from './nlp.service';
import { NlpController } from './nlp.controller';
import { PrismaService } from '../prisma.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [NlpController],
  imports: [HttpModule],
  providers: [NlpService, PrismaService]
})
export class NlpModule { }
