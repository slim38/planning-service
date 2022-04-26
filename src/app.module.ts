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

@Module({
  imports: [
    FileReaderModule,
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: 'memory',
      username: 'root',
      password: '',
      database: 'planning_db',
      models: [Article, PurchasingPart, ProductionPart, WlWorkstation, OrdersInWork, Disposition, DispositionField],
    }),
    ArticleModule,
    PurchasingPartModule,
    ProductionPartModule,
    OrdersInWorkModule,
    WlWorkstationModule,
    DispositionModule,
    DispositionFieldModule,
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
    await this.sequelize.drop();
    await this.sequelize.sync();

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

    await this.articleService.create({
      id: 2,
      ordersInWork: [
        {
          period: 7,
          amount: 13,
          articleId: 1
        }
      ]
    }).catch((err)=>console.log('FIRST___________' + err.message));

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
  }
}
