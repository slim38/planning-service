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
        console.log(parentArticleId+'   '+childArticleId);
        await this.productionPartModel.create({
            parentArticleId,
            childArticleId
        }).catch(err => console.log(err.message+'   '+err.sql));
    }

    async findAll(){
        return await this.productionPartModel.findAll();
    }
}
