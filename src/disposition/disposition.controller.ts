import { Body, Controller, Post } from '@nestjs/common';
import { CapacityPlanningService } from 'src/capacity-planning/capacity-planning.service';
import { Disposition } from './disposition.model';
import { DispositionService } from './disposition.service';

@Controller('disposition')
export class DispositionController {
    constructor(
        private readonly service: DispositionService,
        private readonly capacityService: CapacityPlanningService,
    ) {}

    @Post()
    async update(@Body() dispositions) {
        console.log(JSON.stringify(dispositions));
        await this.service.update(dispositions);
        const period = dispositions.periode;
        return await this.capacityService.getPlanning(period);
    }
}
