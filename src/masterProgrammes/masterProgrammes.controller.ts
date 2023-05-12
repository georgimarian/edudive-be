import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { MasterProgramme } from '@prisma/client';
import { Request } from 'express';
import { MasterProgrammeService } from '../masterProgrammes/masterProgrammes.service';

@Controller('masterProgrammes')
export class MasterProgrammeController {
    constructor(private masterProgrammeService: MasterProgrammeService) { }

    @Get()
    async findAll(@Req() request: Request): Promise<MasterProgramme[]> {
        console.log(request.body);
        return this.masterProgrammeService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<MasterProgramme> {
        try {
            console.log(id)
            return this.masterProgrammeService.findOne({ id: Number(id) });
        } catch (e) {
            return e
        }
    }

    @Post('/createMasterProgramme')
    async createProgramme(@Body() masterData: { name: string }): Promise<MasterProgramme> {
        try {
            return this.masterProgrammeService.createMasterProgramme(masterData);
        } catch (e) {
            console.log(e)
        }
    }
}
