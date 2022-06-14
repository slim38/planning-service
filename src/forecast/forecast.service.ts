import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Forecast } from './forecast.model';

@Injectable()
export class ForecastService {
    constructor(
        @InjectModel(Forecast)
        private readonly model: typeof Forecast,
    ) {}

    async update(template: any) {
        await this.model.upsert(template);
        return await this.getByPeriod(template.period);
    }

    async getByPeriod(period: number) {
        return await this.model.findAll({
            where: {
                period
            }
        })
    }
}
