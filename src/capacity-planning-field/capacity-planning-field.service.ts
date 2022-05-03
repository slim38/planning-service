import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CapacityPlanningField } from './capacity-planning-field.model';

@Injectable()
export class CapacityPlanningFieldService {
    constructor(
        @InjectModel(CapacityPlanningField)
        private model: typeof CapacityPlanningField,
    ) { }

    async create(template: any) { //TODO define type
        await this.model.create(template);
    }
}
