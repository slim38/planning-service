import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Article } from 'src/article/article.model';
import { ArticleService } from 'src/article/article.service';
import { DispositionFieldModule } from 'src/disposition-field/disposition-field.module';
import { DispositionFieldService } from 'src/disposition-field/disposition-field.service';
import { Disposition } from './disposition.model';
import {v4} from 'uuid';
import { DispositionField } from 'src/disposition-field/disposition-field.model';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { firstCharLowerCase } from 'xml2js/lib/processors';

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

        const fields = [];

        function createFields(article: Article, id: string, salesOrderCount: number) {
            article.childProductionArticles.forEach(
                async (child) => {
                    const currentStock = child.amount;
                    const waitingListOrderStock = child.waitingList.length > 0 ? child.waitingList[0].amount : 0;
                    const ordersInWorkCount = child.ordersInWork.length > 0 ? child.ordersInWork[0].amount : 0;
                    const productionOrderCount = salesOrderCount - waitingListOrderStock - ordersInWorkCount;
                    
                    fields.push(
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
    
                    if (child.childProductionArticles.length > 0) {
                        createFields(child, id, productionOrderCount);
                    }
                }
            )
        }
        
        createFields(article, id, productionOrderCount);

        this.dispositionFieldService.bulkCreate(fields);
    }

    

    async getAll() {
        return await this.model.findAll({include: [DispositionField]});
    }
}
