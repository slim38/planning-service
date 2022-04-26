import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Article } from 'src/article/article.model';
import { ArticleService } from 'src/article/article.service';
import { DispositionFieldModule } from 'src/disposition-field/disposition-field.module';
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

    async initialize(period: number, articleId: number, salesOrderCount: number) {
        const articles = await this.articleService.findById(articleId);
        const article = articles[0];

        console.log('Dispo '+JSON.stringify(article));

        const id: string = v4();

        console.log(typeof id);

        const currentStock = article.amount;
        const waitingListOrderStock = article.waitingList.length > 0 ? article.waitingList[0].amount : 0;
        const ordersInWorkCount = article.ordersInWork.length > 0 ? article.ordersInWork[0].amount : 0;
        const productionOrderCount = salesOrderCount - waitingListOrderStock - ordersInWorkCount;

        await this.model.create({
            id,
            period,
            salesArticleId: article.id,
            salesOrderCount,
            plannedStock: 0,
            currentStock,
            waitingListOrderStock,
            ordersInWorkCount,
            productionOrderCount
        });
        
        this.createFields(article, id, salesOrderCount);

        console.log('done done------------------------')
    }

    createFields(article: Article, id: string, salesOrderCount: number) {
        console.log('Children of ID: '+article.id+' will be created');
        article.childProductionArticles.forEach(
            async (child) => {
                console.log('Creating Child: '+child.id);
                const currentStock = child.amount;
                const waitingListOrderStock = child.waitingList.length > 0 ? child.waitingList[0].amount : 0;
                const ordersInWorkCount = child.ordersInWork.length > 0 ? child.ordersInWork[0].amount : 0;
                const productionOrderCount = salesOrderCount - waitingListOrderStock - ordersInWorkCount;
                
                await this.dispositionFieldService.create(
                    {
                       dispositionId: id,
                       salesOrderCount,
                       plannedStock: 0,
                       currentStock,
                       waitingListOrderStock,
                       ordersInWorkCount,
                       productionOrderCount,
                       articleId: child.id
                    }
                );

                console.log('Creating Child done: '+child.id);

                if (child.childProductionArticles.length > 0) {
                    console.log('HEEEEYY___________________________________________' + JSON.stringify(child.childProductionArticles));
                    await this.createFields(child, id, productionOrderCount);
                }
                else {
                    console.log(JSON.stringify(await this.getAll()));
                }
            }
        )
    }

    async getAll() {
        return await this.model.findAll({include: [DispositionField]});
    }
}
