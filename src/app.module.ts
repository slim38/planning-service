/* eslint-disable prettier/prettier */
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileReaderModule } from './file-reader/file-reader.module';
import { ArticleModule } from './article/article.module';
import { PurchasingPartModule } from './purchasing-part/purchasing-part.module';
import { ProductionPartModule } from './production-part/production-part.module';
import { ArticleService } from './article/article.service';
import { ProductionPartService } from './production-part/production-part.service';
import { Article } from './article/article.model';
import { PurchasingPart } from './purchasing-part/purchasing-part.model';
import { ProductionPart } from './production-part/production-part.model';
import { OrdersInWorkModule } from './orders-in-work/orders-in-work.module';
import { WlWorkstationModule } from './wl-workstation/wl-workstation.module';
import { DispositionModule } from './disposition/disposition.module';
import { DispositionFieldModule } from './disposition-field/disposition-field.module';
import { WlWorkstation } from './wl-workstation/wl-workstation.model';
import { OrdersInWork } from './orders-in-work/orders-in-work.model';
import { Disposition } from './disposition/disposition.model';
import { DispositionField } from './disposition-field/disposition-field.model';
import { Sequelize } from 'sequelize-typescript';
import { SequelizeMethod } from 'sequelize/types/utils';
import { OrdersInWorkService } from './orders-in-work/orders-in-work.service';
import { DispositionService } from './disposition/disposition.service';
import { ProductionStepModule } from './production-step/production-step.module';
import { CapacityPlanningModule } from './capacity-planning/capacity-planning.module';
import { CapacityPlanningFieldModule } from './capacity-planning-field/capacity-planning-field.module';
import { PlanningFieldPositionModule } from './planning-field-position/planning-field-position.module';
import { WorkplaceModule } from './workplace/workplace.module';
import { Workplace } from './workplace/workplace.model';
import { ProductionStep } from './production-step/production-step-model';
import { CapacityPlanning } from './capacity-planning/capacity-planning.model';
import { CapacityPlanningField } from './capacity-planning-field/capacity-planning-field.model';
import { PlanningFieldPosition } from './planning-field-position/planning-field-position.model';
import { PurchasePlanningModule } from './purchase-planning/purchase-planning.module';
import { PurchasePositionModule } from './purchase-position/purchase-position.module';
import { PurchasePositionMasterModule } from './purchase-position-master/purchase-position-master.module';
import { FutureInvardModule } from './future-invard/future-invard.module';
import { FuturInward } from './future-invard/future-invard.model';
import { PurchasePositionMasterService } from './purchase-position-master/purchase-position-master.service';
import { PurchasePositionMasterModel } from './purchase-position-master/purchase-position-master.model';
import { PurchasePlanningModel } from './purchase-planning/purchase-planning.model';
import { PurchasePositionModel } from './purchase-position/purchase-position.model';
import { ForecastModule } from './forecast/forecast.module';
import { Forecast } from './forecast/forecast.model';
import { FileWriterModule } from './file-writer/file-writer.module';
import { DirectSell } from './direct-sell/direct-sell.model';
import { BatchModule } from './batch/batch.module';
import { BatchPositionModule } from './batch-position/batch-position.module';
import { Batch } from './batch/batch.model';
import { BatchPosition } from './batch-position/batch-position.model';

@Module({
  imports: [
    FileReaderModule,
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: 'memory',
      username: 'root',
      password: '',
      database: 'planning_db',
      models: [
        Article,
        PurchasingPart,
        ProductionPart,
        WlWorkstation,
        OrdersInWork,
        Disposition,
        DispositionField,
        Workplace,
        ProductionStep,
        CapacityPlanning,
        CapacityPlanningField,
        PlanningFieldPosition,
        FuturInward,
        PurchasePlanningModel,
        PurchasePositionModel,
        PurchasePositionMasterModel,
        Forecast,
        DirectSell,
        Batch,
        BatchPosition
      ],
    }),
    ArticleModule,
    PurchasingPartModule,
    ProductionPartModule,
    OrdersInWorkModule,
    WlWorkstationModule,
    DispositionModule,
    DispositionFieldModule,
    ProductionStepModule,
    CapacityPlanningModule,
    CapacityPlanningFieldModule,
    PlanningFieldPositionModule,
    WorkplaceModule,
    PurchasePlanningModule,
    PurchasePositionModule,
    PurchasePositionMasterModule,
    FutureInvardModule,
    ForecastModule,
    FileWriterModule,
    BatchModule,
    BatchPositionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    private articleService: ArticleService,
    private productionPartService: ProductionPartService,
    private oiwService: OrdersInWorkService,
    private sequelize: Sequelize,
    private dispositionService: DispositionService
  ) {}

  async onApplicationBootstrap() {
    //await this.sequelize.drop();
    //await this.sequelize.sync().catch((err)=>console.log('FIRST___________' + err.message));
    /*
    await this.productionPartService.create(1, 26);
    await this.productionPartService.create(1, 51);
    
    await this.productionPartService.create(51, 16);
    await this.productionPartService.create(51, 17);
    await this.productionPartService.create(51, 50);
    await this.productionPartService.create(50, 10);
    await this.productionPartService.create(50, 4);
    await this.productionPartService.create(50, 49);
    await this.productionPartService.create(49, 7);
    await this.productionPartService.create(49, 13);
    await this.productionPartService.create(49, 18);

    await this.articleService.create({
      id: 1,
      ordersInWork: [
        {
          period: 7,
          amount: 13,
          articleId: 1
        }
      ]
    }).catch((err)=>console.log(err.message));

    await this.articleService.bulkCreate({
      id: 2,
      ordersInWork: null
    });

    await this.articleService.create({
      id: 3,
      ordersInWork: [
        {
          period: 7,
          amount: 13,
          articleId: 1
        }
      ]
    }).catch((err)=>console.log('FIRST___________' + err.message));

    await this.productionPartService.create(1, 2).catch((err)=>console.log(err.message));
    await this.productionPartService.create(2, 3);


    const article = await this.articleService.findById(1).catch((err)=>console.log(err.message));

    //const pp = await this.productionPartService.findAll();

    //const oiw = await this.oiwService.getAll();

    console.log('\n'+JSON.stringify(article));

    await this.dispositionService.initialize(7, 1, 200);

    const dispo = await this.dispositionService.getAll();

    console.log('\n'+JSON.stringify(dispo));
    */
  }
}
