import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductionStep } from './production-step-model';

@Injectable()
export class ProductionStepService {
    constructor(
        @InjectModel(ProductionStep)
        readonly model: typeof ProductionStep,
    ) {}

    async create(template: any) { //TODO: Typisieren
        return await this.model.create(template).catch(err => console.log(JSON.stringify(err.errors)));
    }
}
