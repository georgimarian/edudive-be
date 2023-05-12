import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, MasterProgramme } from '@prisma/client';


@Injectable()
export class MasterProgrammeService {
    private readonly masterProgrammes: MasterProgramme[] = [];

    constructor(private prisma: PrismaService) { }

    async findAll(): Promise<MasterProgramme[]> {
        return this.prisma.masterProgramme.findMany();
    }

    async findOne(masterProgrammeUniqueInput: Prisma.MasterProgrammeWhereUniqueInput): Promise<MasterProgramme> {
        return this.prisma.masterProgramme.findUnique({ where: masterProgrammeUniqueInput });
    }

    async createMasterProgramme(data: Prisma.MasterProgrammeCreateInput): Promise<MasterProgramme> {
        return this.prisma.masterProgramme.create({
            data
        })
    }

    async updateMasterProgramme(params: {
        where: Prisma.MasterProgrammeWhereUniqueInput;
        data: Prisma.MasterProgrammeUpdateInput
    }): Promise<MasterProgramme> {
        const { data, where } = params;
        return this.prisma.masterProgramme.update({
            data, where
        })
    }

    async deleteMasterProgramme(where: Prisma.MasterProgrammeWhereUniqueInput): Promise<MasterProgramme> {
        return this.prisma.masterProgramme.delete({ where })
    }
}
