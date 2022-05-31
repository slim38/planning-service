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

@Injectable()
export class CapacityPlanningService {
    constructor(
        @InjectModel(CapacityPlanning)
        private readonly model: typeof CapacityPlanning,
        private readonly workplaceService: WorkplaceService,
        private readonly dispositionService: DispositionService,
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

            const pfId: string = v4();

            for (const productionStep of workplace.productionSteps) {
                const dispoFields = this.dispositionService.findInArrayByArticle(dispositions, productionStep.articleId);
                let articleProcessTime = 0;
                dispoFields.forEach(dispoField => {
                    articleProcessTime += productionStep.processTime * dispoField.productionOrderCount;
                });
                planningPositions.push({
                    planningPeriod: period,
                    workplace: workplace.id,
                    articleId: productionStep.articleId,
                    processTime: articleProcessTime,
                    setUpTime: productionStep.setupTime,
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

                processTime += articleProcessTime;
                setUpTime += productionStep.setupTime;
            };

            const capacityNeedNew = processTime;
            const capacityNeedPrev = oiwTime + wipTime;

            planningFields.push({
                id: pfId,
                planningPeriod: period,
                workplace: workplace.id,
                capacityNeedNew,
                totalSetUpTimeNew: setUpTime,
                capacityNeedPrev,
                totalCapacityNeed: capacityNeedNew + capacityNeedPrev
                //TODO: Schichten, Überstunden
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

    async getPlanning(period: number) {
        return await this.model.findByPk(period, {
            include: [
                { model: CapacityPlanningField, include: [PlanningFieldPosition] },
            ]
        });
    }
}
