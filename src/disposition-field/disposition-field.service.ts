import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize/dist/common/sequelize.decorators';
import { DispositionField } from './disposition-field.model';

@Injectable()
export class DispositionFieldService {
    constructor(
        @InjectModel(DispositionField)
        private model: typeof DispositionField,
    ) {}

    async create(template: any){
        await this.model.create(template);
    }

    async bulkCreate(array: any[]){
        await this.model.bulkCreate(array);
    }

    async deleteByPeriod(period) {
        await this.model.destroy({
            where: {
                period,
            }
        });
    }
}
