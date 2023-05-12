import { Module } from '@nestjs/common';
import { MasterProgrammeController } from '../masterProgrammes/masterProgrammes.controller';
import { PrismaService } from '../prisma.service';
import { MasterProgrammeService } from '../masterProgrammes/masterProgrammes.service';

@Module({
    controllers: [MasterProgrammeController],
    providers: [MasterProgrammeService, PrismaService],
})

export class MasterProgrammeModule { }
