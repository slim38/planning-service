import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CapacityPlanningField } from './capacity-planning-field.model';

@Injectable()
export class CapacityPlanningFieldService {
    constructor(
        @InjectModel(CapacityPlanningField)
        private model: typeof CapacityPlanningField,
    ) { }

    async bulkCreate(templates: any[]) { //TODO define type
        await this.model.bulkCreate(templates, {
            updateOnDuplicate: ['capacityNeedNew'],
        });
    }
}
