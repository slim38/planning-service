import { Body, Controller, Post } from '@nestjs/common';
import { DirectSellService } from './direct-sell.service';

@Controller('direct-sell')
export class DirectSellController {
    constructor(
        private readonly service: DirectSellService,
    ) {}

    @Post()
    async create(@Body() template) {
        return await this.service.create(template);
    }
}
