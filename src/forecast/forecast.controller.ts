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
        console.log(JSON.stringify(forecast));
        const newForecast = await this.service.update(forecast);
        console.log(JSON.stringify(newForecast));
        return newForecast;
    }

    @Get()
    async get(@Query('period') period: number) {
        return await this.service.getByPeriod(period);
    }
}
