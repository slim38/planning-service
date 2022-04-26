import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize/dist/common/sequelize.decorators';
import { OrdersInWork } from 'src/orders-in-work/orders-in-work.model';
import { WlWorkstation } from 'src/wl-workstation/wl-workstation.model';
import { WlWorkstationModule } from 'src/wl-workstation/wl-workstation.module';
import { Article } from './article.model';

@Injectable()
export class ArticleService {
    constructor(
        @InjectModel(Article)
        private articleModel: typeof Article
    ){}

    async findById(id){
        return await this.articleModel.findAll({
            where: {
                id
            },
            include: [
                {
                    model: Article,
                    as: 'childProductionArticles',
                    include: [
                        {
                            model: Article,
                            as: 'childProductionArticles',
                            include: [
                                {
                                    model: Article,
                                    as: 'childProductionArticles',
                                    include: [
                                        {
                                            model: Article,
                                            as: 'childProductionArticles',
                                            include: [
                                                {
                                                    model: Article,
                                                    as: 'childProductionArticles',
                                                    include: [
                                                        {model: OrdersInWork},
                                                        {model: WlWorkstation},
                                                    ]
                                                },
                                                {model: OrdersInWork},
                                                {model: WlWorkstation},
                                            ]
                                        },
                                        {model: OrdersInWork},
                                        {model: WlWorkstation},
                                    ]
                                },
                                {model: OrdersInWork},
                                {model: WlWorkstation},
                            ]
                        },
                        {model: OrdersInWork},
                        {model: WlWorkstation},
                    ]
                },
                OrdersInWork,
                WlWorkstation
            ]
        });
    }

    async create(template: any) {
        await this.articleModel.sync();
        await this.articleModel.create(template, {
            include: [OrdersInWork]
            }
        );
    }

}
