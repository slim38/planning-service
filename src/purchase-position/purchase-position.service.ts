import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PurchasePositionModel } from './purchase-position.model';

@Injectable()
export class PurchasePositionService {
    constructor(
        @InjectModel(PurchasePositionModel)
        private readonly model: typeof PurchasePositionModel,
    ) {}

    async bulkCreate(template: any[]) {
        return await this.model.bulkCreate(template).catch(err => console.log('\n \n'+JSON.stringify(err)));
    }
}
