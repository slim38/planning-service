import { Body, Controller, Post } from '@nestjs/common';
import { Disposition } from './disposition.model';
import { DispositionService } from './disposition.service';

@Controller('disposition')
export class DispositionController {
    constructor(
        private readonly service: DispositionService
    ) {}

    @Post()
    async create(@Body() dispositions: Disposition[]) {
        console.log(JSON.stringify(dispositions))
    }
}
