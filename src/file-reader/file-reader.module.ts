/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Article } from 'src/article/article.model';
import { ArticleModule } from 'src/article/article.module';
import { ArticleService } from 'src/article/article.service';
import { CapacityPlanning } from 'src/capacity-planning/capacity-planning.model';
import { CapacityPlanningModule } from 'src/capacity-planning/capacity-planning.module';
import { CapacityPlanningService } from 'src/capacity-planning/capacity-planning.service';
import { DispositionField } from 'src/disposition-field/disposition-field.model';
import { DispositionFieldService } from 'src/disposition-field/disposition-field.service';
import { Disposition } from 'src/disposition/disposition.model';
import { DispositionModule } from 'src/disposition/disposition.module';
import { DispositionService } from 'src/disposition/disposition.service';
import { OrdersInWork } from 'src/orders-in-work/orders-in-work.model';
import { OrdersInWorkModule } from 'src/orders-in-work/orders-in-work.module';
import { OrdersInWorkService } from 'src/orders-in-work/orders-in-work.service';
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
    WorkplaceModule,
    SequelizeModule.forFeature([Disposition, DispositionField, Article, OrdersInWork, WlWorkstation, CapacityPlanning])
  ],
  controllers: [FileReaderController],
  providers: [
    FileReaderService,
    ArticleService,
    DispositionService,
    OrdersInWorkService,
    WlWorkstationService,
    DispositionFieldService,
    CapacityPlanningService
  ],
})
export class FileReaderModule {}
