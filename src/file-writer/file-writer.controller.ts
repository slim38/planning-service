import { Controller, Get, Query, Res, Response } from '@nestjs/common';
import { FileWriterService } from './file-writer.service';

@Controller('file-writer')
export class FileWriterController {
    constructor(
        private readonly service: FileWriterService
    ) {}

    @Get()
    async writeFile(@Query('period') period: number, @Response() res) {
        const xmlStr = await this.service.write(period);
        res.set('Content-Type', 'text/xml');
        res.send(xmlStr);
    }
}
