import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ForecastService } from './forecast.service';

@Controller('forecast')
export class ForecastController {
    constructor(
        private readonly service: ForecastService,
    ) {}

    @Post()
    async create(@Body() forecast) {
        await this.service.create(forecast);
    }

    @Get()
    async get(@Query('period') period: number) {
        return await this.service.getByPeriod(period);
    }
}
