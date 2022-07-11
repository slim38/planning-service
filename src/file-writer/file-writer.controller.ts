import { Controller, Get, Query, Res, Response } from '@nestjs/common';
import { FileWriterService } from './file-writer.service';

@Controller('file-writer')
export class FileWriterController {
    constructor(
        private readonly service: FileWriterService
    ) {}

    @Get()
    async writeFile(
        @Query('period') period: number,
        @Query('p1') p1: number,
        @Query('p2') p2: number,
        @Query('p3') p3: number,
        @Response() res,
    ) {
        const xmlStr = await this.service.write(period, p1, p2, p3);
        res.set('Content-Type', 'text/xml');
        res.send(xmlStr);
    }
}
