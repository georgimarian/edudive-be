import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MasterProgramme } from '@prisma/client';
import { MasterProgrammeService } from '../masterProgrammes/masterProgrammes.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('masterProgrammes')
@ApiTags('masterProgrammes')
export class MasterProgrammeController {
    constructor(private masterProgrammeService: MasterProgrammeService) { }

    @Get()
    @ApiOkResponse()
    async findAll(): Promise<MasterProgramme[]> {
        return this.masterProgrammeService.findAll();
    }

    @Get(':id')
    @ApiOkResponse()
    async findOne(@Param('id') id: string): Promise<MasterProgramme> {
        try {
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
            return (e)
        }
    }
}
