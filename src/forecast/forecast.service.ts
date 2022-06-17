import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CapacityPlanningService } from 'src/capacity-planning/capacity-planning.service';
import { DispositionService } from 'src/disposition/disposition.service';
import { Forecast } from './forecast.model';

@Injectable()
export class ForecastService {
    constructor(
        @InjectModel(Forecast)
        private readonly model: typeof Forecast,
        private readonly dispoService: DispositionService,
        private readonly capacityService: CapacityPlanningService,
    ) {}

    async update(template: any) {
        await this.model.upsert(template);

        const forecastP1 = template.firstP1;
        const forecastP2 = template.firstP2;
        const forecastP3 = template.firstP3;

        const period = template.period;

        await this.dispoService.deleteByPeriod(period);
        await this.capacityService.deleteByPeriod(period);
        
        const dispoP1 = await this.dispoService.initialize(period, 1, forecastP1);
        const dispoP2 = await this.dispoService.initialize(period, 2, forecastP2);
        const dispoP3 = await this.dispoService.initialize(period, 3, forecastP3);

        await this.capacityService.refresh(
            [
                dispoP1,
                dispoP2,
                dispoP3,
            ],
            period
        );

        //await this.purchasePlanning.initialize(period);

        return {
            P1: dispoP1,
            P2: dispoP2,
            P3: dispoP3
        };
    }

    async getByPeriod(period: number) {
        return await this.model.findAll({
            where: {
                period
            }
        })
    }
}
