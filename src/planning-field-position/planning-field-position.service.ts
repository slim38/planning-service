import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PlanningFieldPosition } from './planning-field-position.model';

@Injectable()
export class PlanningFieldPositionService {
    constructor(
        @InjectModel(PlanningFieldPosition)
        private readonly model: typeof PlanningFieldPosition,
    ) {}

    async bulkCreate(templates: any[]){
        await this.model.bulkCreate(templates, {
            updateOnDuplicate: ['processTime'],
        });
    }

    async deleteByPeriod(period: number) {
        await this.model.destroy({
            where: {
                planningPeriod: period,
            },
        });
    }
}
