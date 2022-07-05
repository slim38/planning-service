import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Article } from 'src/article/article.model';
import { ArticleService } from 'src/article/article.service';
import { DispositionFieldService } from 'src/disposition-field/disposition-field.service';
import { Disposition } from './disposition.model';
import {v4} from 'uuid';
import { DispositionField } from 'src/disposition-field/disposition-field.model';
import { CapacityPlanningService } from 'src/capacity-planning/capacity-planning.service';

export const plannedStockDefault = 50;

@Injectable()
export class DispositionService {
    constructor(
        @InjectModel(Disposition)
        private model: typeof Disposition,
        private dispositionFieldService: DispositionFieldService,
        private articleService: ArticleService,
        private capacityService: CapacityPlanningService,
    ) {}

    async initialize(period: number, articleId: number, salesOrderCount: number) {
        const articles = await this.articleService.findById(articleId, period);
        const article = articles[0];

        console.log('Dispo '+JSON.stringify(article));

        const id: string = v4();

        console.log(typeof id);

        const currentStock = article.amount;
        console.log(article.waitingList.length);
        const waitingListOrderStock = article.waitingList.length > 0 ? article.waitingList[0].amount : 0;
        console.log(waitingListOrderStock);
        const ordersInWorkCount = article.ordersInWork.length > 0 ? article.ordersInWork[0].amount : 0;
        const plannedStock = currentStock;
        const productionOrderCount = salesOrderCount - waitingListOrderStock - ordersInWorkCount - currentStock + plannedStock;

        await this.model.create({
            id,
            period,
            salesArticleId: article.id,
            salesOrderCount,
            plannedStock: plannedStock,
            currentStock,
            waitinglistOrderCount: waitingListOrderStock,
            ordersInWorkCount,
            productionOrderCount
        });

        const fields = [];

        function createFields(article: Article, id: string, salesOrderCount: number, wl: number, parentFieldId?: string) {
            article.childProductionArticles.forEach(
                async (child) => {
                    const currentStock = child.id === 26 || child.id === 17 || child.id === 16 ? Math.floor(child.amount / 3) : child.amount;
                    const waitingListOrderStock = child.waitingList.length > 0 ? child.waitingList[0].amount : 0; //TODO: correct calculation
                    const ordersInWorkCount = child.ordersInWork.length > 0 ? child.ordersInWork[0].amount : 0;
                    const plannedStock = currentStock;
                    let productionOrderCount = salesOrderCount - waitingListOrderStock - ordersInWorkCount - currentStock + plannedStock;
                    let socNew = salesOrderCount;
                    if (wl) {
                        productionOrderCount += wl;
                        socNew += wl;
                    }
                    
                    const fieldId: string = v4();

                    fields.push(
                        {
                            id: fieldId,
                            dispositionId: id,
                            salesOrderCount: socNew,
                            plannedStock: plannedStock,
                            currentStock,
                            waitinglistOrderCount: waitingListOrderStock,
                            ordersInWorkCount,
                            productionOrderCount,
                            articleId: child.id,
                            parentId: parentFieldId
                        }
                    );
    
                    if (child.childProductionArticles.length > 0) {
                        createFields(child, null, productionOrderCount, waitingListOrderStock, fieldId);
                    }
                }
            )
        }
        
        createFields(article, id, productionOrderCount, waitingListOrderStock);

        await this.dispositionFieldService.bulkCreate(fields);

        return await this.findById(id);
    }

    async getAll() {
        return await this.model.findAll({include: [DispositionField]});
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

    async findByPeriod(period: number) {
        return await this.model.findAll({
            where: {
                period
            },
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

    async deleteByPeriod(period) {
        await this.model.destroy({
            where: {
                period,
            }
        });
    }

    async update(result: any) { //typisieren
        const p1 = result.result.filter(p => p.salesArticleId === 1)[0];
        const p2 = result.result.filter(p => p.salesArticleId === 2)[0];
        const p3 = result.result.filter(p => p.salesArticleId === 3)[0];

        const period = result.periode;

        await this.deleteByPeriod(period);
        
        await this.model.create(p1).catch((err) => console.log('FEHLER:_________ \n'+JSON.stringify(err)));
        await this.model.create(p2);
        await this.model.create(p3);

        await this.updateFields(p1);
        await this.updateFields(p2);
        await this.updateFields(p3);

        await this.capacityService.deleteByPeriod(period);
        await this.capacityService.refresh(
            [
                p1,
                p2,
                p3,
            ],
            period
        );
    }

    private async updateFields(dispo: any) {
        const toCreate = [];

        const  updateChild = (child: any) => {
            toCreate.push(child);

            if (child.childFields.length > 0) {
                for (let c of child.childFields) {
                    updateChild(c);
                }
            }
        }

        if (dispo.fields.length > 0) {
            for (let c of dispo.fields) {
                updateChild(c);
            }
        }

        await this.dispositionFieldService.bulkCreate(toCreate);
    }
}
