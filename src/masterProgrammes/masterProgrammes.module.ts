import { Module } from '@nestjs/common';
import { MasterProgrammeController } from 'src/masterProgrammes/masterProgrammes.controller';
import { PrismaService } from 'src/prisma.service';
import { MasterProgrammeService } from 'src/masterProgrammes/masterProgrammes.service';

@Module({
    controllers: [MasterProgrammeController],
    providers: [MasterProgrammeService, PrismaService],
})

export class MasterProgrammeModule { }
