import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Article } from 'src/article/article.model';
import { ArticleService } from 'src/article/article.service';
import { DispositionFieldService } from 'src/disposition-field/disposition-field.service';
import { Disposition } from './disposition.model';
import {v4} from 'uuid';
import { DispositionField } from 'src/disposition-field/disposition-field.model';

@Injectable()
export class DispositionService {
    constructor(
        @InjectModel(Disposition)
        private model: typeof Disposition,
        private dispositionFieldService: DispositionFieldService,
        private articleService: ArticleService
    ) {}

    plannedStockDefault = 50;

    async initialize(period: number, articleId: number, salesOrderCount: number) {
        const articles = await this.articleService.findById(articleId, period);
        const article = articles[0];

        console.log('Dispo '+JSON.stringify(article));

        const id: string = v4();

        console.log(typeof id);

        const currentStock = article.amount;
        const waitingListOrderStock = article.waitingList.length > 0 ? article.waitingList[0].amount : 0;
        const ordersInWorkCount = article.ordersInWork.length > 0 ? article.ordersInWork[0].amount : 0;
        const productionOrderCount = salesOrderCount + this.plannedStockDefault - waitingListOrderStock - ordersInWorkCount;

        await this.model.create({
            id,
            period,
            salesArticleId: article.id,
            salesOrderCount,
            plannedStock: this.plannedStockDefault,
            currentStock,
            waitingListOrderStock,
            ordersInWorkCount,
            productionOrderCount
        });

        const fields = [];

        function createFields(article: Article, id: string, salesOrderCount: number, parentFieldId?: string) {
            article.childProductionArticles.forEach(
                async (child) => {
                    const currentStock = child.amount;
                    const waitingListOrderStock = child.waitingList.length > 0 ? child.waitingList[0].amount : 0; //TODO: correct calculation
                    const ordersInWorkCount = child.ordersInWork.length > 0 ? child.ordersInWork[0].amount : 0;
                    const productionOrderCount = salesOrderCount + this.plannedStockDefault - waitingListOrderStock - ordersInWorkCount - currentStock;
                    
                    const fieldId: string = v4();

                    fields.push(
                        {
                            id: fieldId,
                            dispositionId: id,
                            salesOrderCount,
                            plannedStock: 0,
                            currentStock,
                            waitingListOrderStock,
                            ordersInWorkCount,
                            productionOrderCount,
                            articleId: child.id,
                            parentId: parentFieldId
                        }
                    );
    
                    if (child.childProductionArticles.length > 0) {
                        createFields(child, null, productionOrderCount, fieldId);
                    }
                }
            )
        }
        
        createFields(article, id, productionOrderCount);

        await this.dispositionFieldService.bulkCreate(fields);

        return await this.findById(id);
    }

    async getAll() {
        return await this.model.findAll({include: [DispositionField]});
    }

    findInArrayByArticle(dispositions: Disposition[], articleId) {
        const dp: (DispositionField | { productionOrderCount: number })[] = [];

        dispositions.forEach(disposition => {
            if (disposition.salesArticleId === articleId){
                dp.push({productionOrderCount: disposition.productionOrderCount});
            }
            else disposition.fields.forEach(field => {
                if (field.articleId == articleId){
                    dp.push(field);
                }
                else findInChildren(field);
            })
        });

        function findInChildren(field: DispositionField) {
            if (field.childFields) {
                field.childFields.forEach(child => {
                    if (child.articleId === articleId){
                        dp.push(child);
                    }
                    else findInChildren(child);
                })
            }
        }

        return dp;
    }

    private async findById(id: string) {
        return await this.model.findByPk(id, {
            include: [
                {
                    model: DispositionField,
                    include: [
                        {
                            model: DispositionField,
                            include: [
                                {
                                    model: DispositionField,
                                    include: [
                                        {
                                            model: DispositionField,
                                            include: [
                                                {
                                                    model: DispositionField,
                                                    
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });
    }
}
