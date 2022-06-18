import { Body, Controller, Post } from '@nestjs/common';
import { BatchService } from './batch.service';

@Controller('batch')
export class BatchController {
    constructor(
        private readonly service: BatchService
    ) {}

    @Post()
    async create(@Body() temp) {
        await this.service.create(temp);
    }
}
