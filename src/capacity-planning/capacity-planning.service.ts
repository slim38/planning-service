import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CapacityPlanningFieldService } from 'src/capacity-planning-field/capacity-planning-field.service';
import { Disposition } from 'src/disposition/disposition.model';
import { DispositionService } from 'src/disposition/disposition.service';
import { WorkplaceService } from 'src/workplace/workplace.service';
import { CapacityPlanning } from './capacity-planning.model';
import { CapacityPlanningModule } from './capacity-planning.module';

@Injectable()
export class CapacityPlanningService {
    constructor(
        @InjectModel(CapacityPlanning)
        private readonly model: typeof CapacityPlanning,
        private readonly workplaceService: WorkplaceService,
        private readonly dispositionService: DispositionService,
    ) {}

    async refresh (dispositions: Disposition[], period: number) { //TODO: TemplateType
        const workplaces = await this.workplaceService.findAll();

        const planningFields = []; //TODO: typisieren
        const planningPositions = []; //

        workplaces.forEach(workplace => {
            let processTime = 0;
            let setUpTime = 0;
            workplace.productionSteps.forEach(productionStep => {
                const dispoFields = this.dispositionService.findInArrayByArticle(dispositions, productionStep.articleId);
                let articleProcessTime = 0;
                dispoFields.forEach(dispoField => {
                    articleProcessTime += productionStep.processTime * dispoField.productionOrderCount;
                });
                planningPositions.push({
                    planningPeriod: period,
                    workplace: workplace.id,
                    articleId: productionStep.id,
                    processTime: articleProcessTime,
                    setUpTime: productionStep.setupTime,
                })
                processTime += articleProcessTime;
                setUpTime += productionStep.setupTime;
            });
            planningFields.push({
                planningPeriod: period,
                workplace: workplace.id,
                capacityNeedNew: processTime,
                totalSetUpTimeNew: setUpTime,
                //TODO: Schichten, Überstunden, Zeiten aus Warteschlange und InBearbeitung
            });
        });

        const planning = {
            period: period,
            //TODO: average workload
        }

        console.log(JSON.stringify(planning));
        console.log(JSON.stringify(planningFields));
        console.log(JSON.stringify(planningPositions));
    }
}
