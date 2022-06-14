import { Controller, Get, Query } from '@nestjs/common';
import { PurchasePlanningService } from './purchase-planning.service';

@Controller('purchase-planning')
export class PurchasePlanningController {
    constructor(
        private readonly service: PurchasePlanningService,
    ) {}

    @Get()
    async getPurchasePlanning(@Query('period') period: number) {
        await this.service.initialize(period);

        const planning = await this.service.findByPeriod(period);
        console.log(JSON.stringify(planning+' '+period));
        return planning;
    }
}
