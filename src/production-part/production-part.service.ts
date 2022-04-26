import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductionPart } from './production-part.model';

@Injectable()
export class ProductionPartService {
    constructor(
        @InjectModel(ProductionPart)
        private productionPartModel: typeof ProductionPart
    ) {}

    async create(parentArticleId: number, childArticleId: number) {
        await this.productionPartModel.sync();
        await this.productionPartModel.create({
            parentArticleId,
            childArticleId
        })
    }

    async findAll(){
        return await this.productionPartModel.findAll();
    }
}
