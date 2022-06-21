import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CapacityPlanningFieldService } from 'src/capacity-planning-field/capacity-planning-field.service';
import { Disposition } from 'src/disposition/disposition.model';
import { DispositionService } from 'src/disposition/disposition.service';
import { WorkplaceService } from 'src/workplace/workplace.service';
import { CapacityPlanning } from './capacity-planning.model';
import { CapacityPlanningModule } from './capacity-planning.module';
import {v4} from 'uuid';
import { PlanningFieldPositionService } from 'src/planning-field-position/planning-field-position.service';
import { PlanningFieldPosition } from 'src/planning-field-position/planning-field-position.model';
import { CapacityPlanningField } from 'src/capacity-planning-field/capacity-planning-field.model';
import { OrdersInWorkService } from 'src/orders-in-work/orders-in-work.service';
import { ProductionStep } from 'src/production-step/production-step-model';
import { ArticleService } from 'src/article/article.service';
import { Article } from 'src/article/article.model';
import { DispositionField } from 'src/disposition-field/disposition-field.model';

@Injectable()
export class CapacityPlanningService {
    constructor(
        @InjectModel(CapacityPlanning)
        private readonly model: typeof CapacityPlanning,
        private readonly workplaceService: WorkplaceService,
        private readonly planningFieldService: CapacityPlanningFieldService,
        private readonly planningPositionService: PlanningFieldPositionService,
        private readonly articleService: ArticleService,
    ) {}

    async refresh (dispositions: Disposition[], period: number) { //TODO: TemplateType
        const workplaces = await this.workplaceService.findAll();

        const planningFields = []; //TODO: typisieren
        const planningPositions = []; //

        for (const workplace of workplaces) {
            let processTime = 0;
            let setUpTime = 0;
            let oiwTime = 0;
            let wipTime = 0;
            let totalSetUpTimePrev = 0;

            const pfId: string = v4();

            for (const productionStep of workplace.productionSteps) {
                const dispoFields = this.findInArrayByArticle(dispositions, productionStep.articleId);
                let articleProcessTime = 0;
                dispoFields.forEach(dispoField => {
                    articleProcessTime += productionStep.processTime * dispoField.productionOrderCount;
                });
                planningPositions.push({
                    planningPeriod: period,
                    workplace: workplace.id,
                    articleId: productionStep.articleId,
                    processTime: articleProcessTime,
                    setupTime: productionStep.setupTime,
                    planningFieldId: pfId
                });
                
                let article: Article;

                await this.articleService.findById(productionStep.articleId, period).then( a => {
                    console.log('\n \n________________________________\n'+JSON.stringify(a));
                    article = a[0];
                });

                for (const oiw of article.ordersInWork) {
                    oiwTime += oiw.timeneed;
                }

                for (const wip of article.waitingList) {
                    wipTime += wip.timeneed;
                }

                if (article.waitingList) {
                    totalSetUpTimePrev + productionStep.setupTime;
                }

                processTime += articleProcessTime;
                setUpTime += productionStep.setupTime;
            };

            const capacityNeedNew = processTime;
            const capacityNeedPrev = oiwTime + wipTime;
            if (workplace.id <= 6 || workplace.id >= 14) {
                setUpTime = setUpTime * 2;
            }
            else {
                setUpTime = setUpTime * 3;
            }
            const totalCapacityNeed = capacityNeedNew + capacityNeedPrev + setUpTime;
            
            let overtime = Math.floor((totalCapacityNeed-2400)/5)
            if (overtime < 0) {
                overtime = 0;
            }
            
            let shifts = Math.floor(overtime/241) + 1;

            planningFields.push({
                id: pfId,
                planningPeriod: period,
                workplace: workplace.id,
                capacityNeedNew,
                totalSetUpTimeNew: setUpTime,
                capacityNeedPrev,
                totalCapacityNeed,
                totalSetUpTimePrev,
                overtime,
                shifts
            });
        };

        const planning = {
            period: period,
            //TODO: average workload
        }

        console.log('PLANNING:_________________ ' + JSON.stringify(planning));
        await this.model.upsert(planning).catch(err => console.log(JSON.stringify(err.errors)));

        console.log('PLANNINGFIELDS:_________________ ' + JSON.stringify(planningFields));
        await this.planningFieldService.bulkCreate(planningFields);

        console.log('PLANNINGPOSITIONS:_________________ ' + JSON.stringify(planningPositions));
        await this.planningPositionService.bulkCreate(planningPositions);

        const created = await this.model.findByPk(period, {
            include: [
                { model: CapacityPlanningField, include: [PlanningFieldPosition] },
            ]
        });

        console.log('\n \n'+'CREATED:_________________ ' + JSON.stringify(created));
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

    async getPlanning(period: number) {
        return await this.model.findByPk(period, {
            include: [
                { model: CapacityPlanningField, include: [PlanningFieldPosition] },
            ]
        });
    }

    async deleteByPeriod(period: number) {
        await this.planningPositionService.deleteByPeriod(period).catch(err => console.log('\n'+JSON.stringify(err)+'\n'));
        await this.planningFieldService.deleteByPeriod(period).catch(err => console.log('\n'+JSON.stringify(err)+'\n'));
        
        await this.model.destroy({
            where: {
                period
            },
        });
    }

    async updateFields(template: any[]) {
        for (let t of template) {
            await this.planningFieldService.update(t);
        }
    }
}
