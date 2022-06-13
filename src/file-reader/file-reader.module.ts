/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Article } from 'src/article/article.model';
import { ArticleModule } from 'src/article/article.module';
import { ArticleService } from 'src/article/article.service';
import { CapacityPlanningField } from 'src/capacity-planning-field/capacity-planning-field.model';
import { CapacityPlanningFieldModule } from 'src/capacity-planning-field/capacity-planning-field.module';
import { CapacityPlanningFieldService } from 'src/capacity-planning-field/capacity-planning-field.service';
import { CapacityPlanning } from 'src/capacity-planning/capacity-planning.model';
import { CapacityPlanningModule } from 'src/capacity-planning/capacity-planning.module';
import { CapacityPlanningService } from 'src/capacity-planning/capacity-planning.service';
import { DispositionField } from 'src/disposition-field/disposition-field.model';
import { DispositionFieldService } from 'src/disposition-field/disposition-field.service';
import { Disposition } from 'src/disposition/disposition.model';
import { DispositionModule } from 'src/disposition/disposition.module';
import { DispositionService } from 'src/disposition/disposition.service';
import { FuturInward } from 'src/future-invard/future-invard.model';
import { FutureInvardModule } from 'src/future-invard/future-invard.module';
import { FutureInvardService } from 'src/future-invard/future-invard.service';
import { OrdersInWork } from 'src/orders-in-work/orders-in-work.model';
import { OrdersInWorkModule } from 'src/orders-in-work/orders-in-work.module';
import { OrdersInWorkService } from 'src/orders-in-work/orders-in-work.service';
import { PlanningFieldPosition } from 'src/planning-field-position/planning-field-position.model';
import { PlanningFieldPositionModule } from 'src/planning-field-position/planning-field-position.module';
import { PlanningFieldPositionService } from 'src/planning-field-position/planning-field-position.service';
import { PurchasePlanningModule } from 'src/purchase-planning/purchase-planning.module';
import { WlWorkstation } from 'src/wl-workstation/wl-workstation.model';
import { WlWorkstationModule } from 'src/wl-workstation/wl-workstation.module';
import { WlWorkstationService } from 'src/wl-workstation/wl-workstation.service';
import { WorkplaceModule } from 'src/workplace/workplace.module';
import { FileReaderController } from './file-reader.controller';
import { FileReaderService } from './file-reader.service';

@Module({
  imports: [
    ArticleModule,
    DispositionModule,
    OrdersInWorkModule,
    WlWorkstationModule,
    CapacityPlanningModule,
    CapacityPlanningFieldModule,
    WorkplaceModule,
    PlanningFieldPositionModule,
    FutureInvardModule,
    PurchasePlanningModule,
    SequelizeModule.forFeature([
      Disposition,
      DispositionField,
      Article,
      OrdersInWork,
      WlWorkstation,
      CapacityPlanning,
      CapacityPlanningField,
      PlanningFieldPosition,
      FuturInward
    ])
  ],
  controllers: [FileReaderController],
  providers: [
    FileReaderService,
    ArticleService,
    DispositionService,
    OrdersInWorkService,
    WlWorkstationService,
    DispositionFieldService,
    CapacityPlanningService,
    CapacityPlanningFieldService,
    PlanningFieldPositionService,
    FutureInvardService,
  ],
})
export class FileReaderModule {}
