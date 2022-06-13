import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Article } from 'src/article/article.model';
import { FuturInward } from 'src/future-invard/future-invard.model';
import { PurchasePositionMasterModel } from './purchase-position-master.model';

@Injectable()
export class PurchasePositionMasterService {
    constructor(
        @InjectModel(PurchasePositionMasterModel)
        private readonly model: typeof PurchasePositionMasterModel,
    ) {}

    async findAll() {
        return await this.model.findAll({
            include: [
                {
                    model: Article,
                    include: [FuturInward],
                }
            ]
        });
    }

    async create(template: any) {
        return await this.model.create(template);
    }
}
