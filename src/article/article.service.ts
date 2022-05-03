import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize/dist/common/sequelize.decorators';
import { OrdersInWork } from 'src/orders-in-work/orders-in-work.model';
import { WlWorkstation } from 'src/wl-workstation/wl-workstation.model';
import { WlWorkstationModule } from 'src/wl-workstation/wl-workstation.module';
import { ArticleInterface } from './article.interface';
import { Article } from './article.model';;

@Injectable()
export class ArticleService {
    constructor(
        @InjectModel(Article)
        private articleModel: typeof Article
    ){}

    async findById(id: number, period: number){
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
                                                        {
                                                            model: OrdersInWork,
                                                            where: {
                                                                period,
                                                            },
                                                            required: false,
                                                        },
                                                        {
                                                            model: WlWorkstation,
                                                            where: {
                                                                period,
                                                            },
                                                            required: false,
                                                        },
                                                    ]
                                                },
                                                {
                                                    model: OrdersInWork,
                                                    where: {
                                                        period,
                                                    },
                                                    required: false,
                                                },
                                                {
                                                    model: WlWorkstation,
                                                    where: {
                                                        period,
                                                    },
                                                    required: false,
                                                },
                                            ]
                                        },
                                        {
                                            model: OrdersInWork,
                                            where: {
                                                period,
                                            },
                                            required: false,
                                        },
                                        {
                                            model: WlWorkstation,
                                            where: {
                                                period,
                                            },
                                            required: false,
                                        },
                                    ]
                                },
                                {
                                    model: OrdersInWork,
                                    where: {
                                        period,
                                    },
                                    required: false,
                                },
                                {
                                    model: WlWorkstation,
                                    where: {
                                        period,
                                    },
                                    required: false,
                                },
                            ]
                        },
                        {
                            model: OrdersInWork,
                            where: {
                                period,
                            },
                            required: false,
                        },
                        {
                            model: WlWorkstation,
                            where: {
                                period,
                            },
                            required: false,
                        },
                    ]
                },
                {
                    model: OrdersInWork,
                    where: {
                        period,
                    },
                    required: false,
                },
                {
                    model: WlWorkstation,
                    where: {
                        period,
                    },
                    required: false,
                },
            ]
        });
    }

    async bulkCreate(articles: ArticleInterface[]) {
        await this.articleModel.sync();

        const articlesAny: any[] = articles;

        return await this.articleModel.bulkCreate(articlesAny, {
            include: [{model: OrdersInWork, as: 'ordersInWork'}],
            updateOnDuplicate: ['amount', 'stockValue']
            },
        );
    }

}
