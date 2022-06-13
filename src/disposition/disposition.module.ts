import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Article } from 'src/article/article.model';
import { ArticleModule } from 'src/article/article.module';
import { ArticleService } from 'src/article/article.service';
import { DispositionField } from 'src/disposition-field/disposition-field.model';
import { DispositionFieldModule } from 'src/disposition-field/disposition-field.module';
import { DispositionFieldService } from 'src/disposition-field/disposition-field.service';
import { Disposition } from './disposition.model';
import { DispositionService } from './disposition.service';
import { DispositionController } from './disposition.controller';
import { CapacityPlanningModule } from 'src/capacity-planning/capacity-planning.module';
import { CapacityPlanningService } from 'src/capacity-planning/capacity-planning.service';
import { CapacityPlanning } from 'src/capacity-planning/capacity-planning.model';
import { WorkplaceModule } from 'src/workplace/workplace.module';
import { WorkplaceService } from 'src/workplace/workplace.service';
import { CapacityPlanningFieldModule } from 'src/capacity-planning-field/capacity-planning-field.module';
import { PlanningFieldPositionModule } from 'src/planning-field-position/planning-field-position.module';
import { Workplace } from 'src/workplace/workplace.model';

@Module({
    imports: [
        SequelizeModule.forFeature([Disposition, DispositionField, Article, CapacityPlanning, Workplace]),
        DispositionFieldModule,
        ArticleModule,
        CapacityPlanningModule,
        CapacityPlanningFieldModule,
        PlanningFieldPositionModule,
        WorkplaceModule
    ],
    providers: [
        DispositionService,
        DispositionFieldService,
        ArticleService,
        CapacityPlanningService,
        WorkplaceService,
    ],
    exports: [
        DispositionService
    ],
    controllers: [DispositionController]
})
export class DispositionModule {}
