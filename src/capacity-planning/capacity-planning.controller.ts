import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CapacityPlanningService } from './capacity-planning.service';

@Controller('capacity-planning')
export class CapacityPlanningController {
    constructor(
        private readonly service: CapacityPlanningService,
    ) {}

    @Get()
    async getCapacityPlanning(@Query('period') period: number) {
        const planning = await this.service.getPlanning(period);
        console.log(JSON.stringify(planning+' '+period));
        return planning;
    }

    @Post()
    async update(@Body() temp: any[]) {
        await this.service.updateFields(temp);
    }
}
