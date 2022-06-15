import { Controller, Get, Query } from '@nestjs/common';
import { FileWriterService } from './file-writer.service';

@Controller('file-writer')
export class FileWriterController {
    constructor(
        private readonly service: FileWriterService
    ) {}

    @Get()
    async writeFile(@Query('period') period: number) {
        await this.service.write(period);
    }
}
