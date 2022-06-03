import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductionStep } from 'src/production-step/production-step-model';
import { Workplace } from './workplace.model';

@Injectable()
export class WorkplaceService {
    constructor(
        @InjectModel(Workplace)
        private readonly model: typeof Workplace
    ) {}

    async findAll(){
        return await this.model.findAll({include: [ProductionStep]});
    }

    async create(template: any) {
        return await this.model.create(template);
    }

    
}
