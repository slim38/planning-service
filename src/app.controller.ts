/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductionPart } from './production-part/production-part.model';
import { ProductionPartService } from './production-part/production-part.service';
import { ProductionStepService } from './production-step/production-step.service';
import { PurchasePositionMasterService } from './purchase-position-master/purchase-position-master.service';
import { WorkplaceService } from './workplace/workplace.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly productionPartService: ProductionPartService,
              private readonly workplaceService: WorkplaceService,
              private readonly prodductionStepService: ProductionStepService,
              private readonly purchasePositionMasterService: PurchasePositionMasterService) {}

  @Get()
  async getHello(): Promise<string>{
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

    await this.productionPartService.create(2, 26);
    await this.productionPartService.create(2, 56);
    await this.productionPartService.create(56, 16);
    await this.productionPartService.create(56, 17);
    await this.productionPartService.create(56, 55);
    await this.productionPartService.create(55, 5);
    await this.productionPartService.create(55, 11);
    await this.productionPartService.create(55, 54);
    await this.productionPartService.create(54, 8);
    await this.productionPartService.create(54, 14);
    await this.productionPartService.create(54, 19);

    await this.productionPartService.create(3, 26);
    await this.productionPartService.create(3, 31);
    await this.productionPartService.create(31, 16);
    await this.productionPartService.create(31, 17);
    await this.productionPartService.create(31, 30);
    await this.productionPartService.create(30, 6);
    await this.productionPartService.create(30, 12);
    await this.productionPartService.create(30, 29);
    await this.productionPartService.create(29, 9);
    await this.productionPartService.create(29, 15);
    await this.productionPartService.create(29, 20);

    
    await this.workplaceService.create({id:1});
    await this.workplaceService.create({id:2});
    await this.workplaceService.create({id:3});
    await this.workplaceService.create({id:4});
    await this.workplaceService.create({id:6});
    await this.workplaceService.create({id:7});
    await this.workplaceService.create({id:8});
    await this.workplaceService.create({id:9});
    await this.workplaceService.create({id:10});
    await this.workplaceService.create({id:11});
    await this.workplaceService.create({id:12});
    await this.workplaceService.create({id:13});
    await this.workplaceService.create({id:14});
    await this.workplaceService.create({id:15});

    await this.prodductionStepService.create({
      workplace: 1,
      articleId: 29,
      processTime: 6,
      setupTime: 20,
    });

    await this.prodductionStepService.create({
      workplace: 1,
      articleId: 49,
      processTime: 6,
      setupTime: 20,
    });

    await this.prodductionStepService.create({
      workplace: 1,
      articleId: 54,
      processTime: 6,
      setupTime: 20,
    });

    await this.prodductionStepService.create({
      workplace: 2,
      articleId: 30,
      processTime: 5,
      setupTime: 20,
    });

    await this.prodductionStepService.create({
      workplace: 2,
      articleId: 50,
      processTime: 5,
      setupTime: 30,
    });

    await this.prodductionStepService.create({
      workplace: 2,
      articleId: 55,
      processTime: 6,
      setupTime: 30,
    });

    await this.prodductionStepService.create({
      workplace: 3,
      articleId: 31,
      processTime: 6,
      setupTime: 20,
    });

    await this.prodductionStepService.create({
      workplace: 3,
      articleId: 51,
      processTime: 5,
      setupTime: 20,
    });

    await this.prodductionStepService.create({
      workplace: 3,
      articleId: 56,
      processTime: 6,
      setupTime: 20,
    });

    await this.prodductionStepService.create({
      workplace: 2,
      articleId: 55,
      processTime: 6,
      setupTime: 30,
    });

    await this.prodductionStepService.create({
      workplace: 4,
      articleId: 1,
      processTime: 6,
      setupTime: 30,
    });

    await this.prodductionStepService.create({
      workplace: 4,
      articleId: 2,
      processTime: 7,
      setupTime: 20,
    });

    await this.prodductionStepService.create({
      workplace: 4,
      articleId: 3,
      processTime: 7,
      setupTime: 30,
    });

    await this.prodductionStepService.create({
      workplace: 6,
      articleId: 16,
      processTime: 2,
      setupTime: 15,
    });

    await this.prodductionStepService.create({
      workplace: 6,
      articleId: 18,
      processTime: 3,
      setupTime: 15,
    });

    await this.prodductionStepService.create({
      workplace: 6,
      articleId: 19,
      processTime: 3,
      setupTime: 15,
    });

    await this.prodductionStepService.create({
      workplace: 6,
      articleId: 20,
      processTime: 3,
      setupTime: 15,
    });

    await this.prodductionStepService.create({
      workplace: 7,
      articleId: 10,
      processTime: 2,
      setupTime: 20,
    });

    await this.prodductionStepService.create({
      workplace: 7,
      articleId: 11,
      processTime: 2,
      setupTime: 20,
    });

    await this.prodductionStepService.create({
      workplace: 7,
      articleId: 12,
      processTime: 2,
      setupTime: 20,
    });

    await this.prodductionStepService.create({
      workplace: 7,
      articleId: 13,
      processTime: 2,
      setupTime: 20,
    });

    await this.prodductionStepService.create({
      workplace: 7,
      articleId: 14,
      processTime: 2,
      setupTime: 20,
    });

    await this.prodductionStepService.create({
      workplace: 7,
      articleId: 15,
      processTime: 2,
      setupTime: 20,
    });

    await this.prodductionStepService.create({
      workplace: 7,
      articleId: 18,
      processTime: 2,
      setupTime: 20,
    });

    await this.prodductionStepService.create({
      workplace: 7,
      articleId: 19,
      processTime: 2,
      setupTime: 20,
    });

    await this.prodductionStepService.create({
      workplace: 7,
      articleId: 20,
      processTime: 2,
      setupTime: 20,
    });

    await this.prodductionStepService.create({
      workplace: 7,
      articleId: 26,
      processTime: 2,
      setupTime: 30,
    });

    await this.prodductionStepService.create({
      workplace: 8,
      articleId: 10,
      processTime: 1,
      setupTime: 15,
    });

    await this.prodductionStepService.create({
      workplace: 8,
      articleId: 11,
      processTime: 2,
      setupTime: 15,
    });

    await this.prodductionStepService.create({
      workplace: 8,
      articleId: 12,
      processTime: 2,
      setupTime: 15,
    });

    await this.prodductionStepService.create({
      workplace: 8,
      articleId: 13,
      processTime: 1,
      setupTime: 15,
    });

    await this.prodductionStepService.create({
      workplace: 8,
      articleId: 14,
      processTime: 2,
      setupTime: 15,
    });

    await this.prodductionStepService.create({
      workplace: 8,
      articleId: 15,
      processTime: 2,
      setupTime: 15,
    });

    await this.prodductionStepService.create({
      workplace: 8,
      articleId: 18,
      processTime: 3,
      setupTime: 20,
    });

    await this.prodductionStepService.create({
      workplace: 8,
      articleId: 19,
      processTime: 3,
      setupTime: 25,
    });

    await this.prodductionStepService.create({
      workplace: 8,
      articleId: 20,
      processTime: 3,
      setupTime: 20,
    });

    await this.prodductionStepService.create({
      workplace: 9,
      articleId: 10,
      processTime: 3,
      setupTime: 15,
    });

    await this.prodductionStepService.create({
      workplace: 9,
      articleId: 11,
      processTime: 3,
      setupTime: 15,
    });

    await this.prodductionStepService.create({
      workplace: 9,
      articleId: 12,
      processTime: 3,
      setupTime: 15,
    });

    await this.prodductionStepService.create({
      workplace: 9,
      articleId: 13,
      processTime: 3,
      setupTime: 15,
    });

    await this.prodductionStepService.create({
      workplace: 9,
      articleId: 14,
      processTime: 3,
      setupTime: 15,
    });

    await this.prodductionStepService.create({
      workplace: 9,
      articleId: 15,
      processTime: 3,
      setupTime: 15,
    });

    await this.prodductionStepService.create({
      workplace: 9,
      articleId: 18,
      processTime: 2,
      setupTime: 15,
    });

    await this.prodductionStepService.create({
      workplace: 9,
      articleId: 19,
      processTime: 2,
      setupTime: 20,
    });

    await this.prodductionStepService.create({
      workplace: 9,
      articleId: 20,
      processTime: 2,
      setupTime: 15,
    });

    await this.prodductionStepService.create({
      workplace: 10,
      articleId: 4,
      processTime: 4,
      setupTime: 20,
    });

    await this.prodductionStepService.create({
      workplace: 10,
      articleId: 5,
      processTime: 4,
      setupTime: 20,
    });

    await this.prodductionStepService.create({
      workplace: 10,
      articleId: 6,
      processTime: 4,
      setupTime: 20,
    });

    await this.prodductionStepService.create({
      workplace: 10,
      articleId: 7,
      processTime: 4,
      setupTime: 20,
    });

    await this.prodductionStepService.create({
      workplace: 10,
      articleId: 8,
      processTime: 4,
      setupTime: 20,
    });

    await this.prodductionStepService.create({
      workplace: 10,
      articleId: 9,
      processTime: 4,
      setupTime: 20,
    });

    await this.prodductionStepService.create({
      workplace: 11,
      articleId: 4,
      processTime: 3,
      setupTime: 10,
    });

    await this.prodductionStepService.create({
      workplace: 11,
      articleId: 5,
      processTime: 3,
      setupTime: 10,
    });

    await this.prodductionStepService.create({
      workplace: 11,
      articleId: 6,
      processTime: 3,
      setupTime: 20,
    });

    await this.prodductionStepService.create({
      workplace: 11,
      articleId: 7,
      processTime: 3,
      setupTime: 10,
    });

    await this.prodductionStepService.create({
      workplace: 11,
      articleId: 8,
      processTime: 3,
      setupTime: 10,
    });

    await this.prodductionStepService.create({
      workplace: 11,
      articleId: 9,
      processTime: 3,
      setupTime: 20,
    });

    await this.prodductionStepService.create({
      workplace: 12,
      articleId: 10,
      processTime: 3,
      setupTime: 0,
    });

    await this.prodductionStepService.create({
      workplace: 12,
      articleId: 11,
      processTime: 3,
      setupTime: 0,
    });

    await this.prodductionStepService.create({
      workplace: 12,
      articleId: 12,
      processTime: 3,
      setupTime: 0,
    });

    await this.prodductionStepService.create({
      workplace: 12,
      articleId: 13,
      processTime: 3,
      setupTime: 0,
    });

    await this.prodductionStepService.create({
      workplace: 12,
      articleId: 14,
      processTime: 3,
      setupTime: 0,
    });

    await this.prodductionStepService.create({
      workplace: 12,
      articleId: 15,
      processTime: 3,
      setupTime: 0,
    });

    await this.prodductionStepService.create({
      workplace: 13,
      articleId: 10,
      processTime: 2,
      setupTime: 0,
    });

    await this.prodductionStepService.create({
      workplace: 13,
      articleId: 11,
      processTime: 2,
      setupTime: 0,
    });

    await this.prodductionStepService.create({
      workplace: 13,
      articleId: 12,
      processTime: 2,
      setupTime: 0,
    });

    await this.prodductionStepService.create({
      workplace: 13,
      articleId: 13,
      processTime: 2,
      setupTime: 0,
    });

    await this.prodductionStepService.create({
      workplace: 13,
      articleId: 14,
      processTime: 2,
      setupTime: 0,
    });

    await this.prodductionStepService.create({
      workplace: 13,
      articleId: 15,
      processTime: 2,
      setupTime: 0,
    });

    await this.prodductionStepService.create({
      workplace: 14,
      articleId: 16,
      processTime: 3,
      setupTime: 0,
    });

    await this.prodductionStepService.create({
      workplace: 15,
      articleId: 17,
      processTime: 3,
      setupTime: 15,
    });

    await this.prodductionStepService.create({
      workplace: 15,
      articleId: 26,
      processTime: 3,
      setupTime: 15,
    });

    await this.purchasePositionMasterService.create({
      articleId: 21,
      deliveryTime: 1.8,
      deviation: 0.4,
      prodOneDemand: 1,
      prodTwoDemand: 0,
      prodThreeDemand: 0,
      discAmount: 300,
    });

    await this.purchasePositionMasterService.create({
      articleId: 22,
      deliveryTime: 1.7,
      deviation: 0.4,
      prodOneDemand: 0,
      prodTwoDemand: 1,
      prodThreeDemand: 0,
      discAmount: 300,
    });

    await this.purchasePositionMasterService.create({
      articleId: 23,
      deliveryTime: 1.2,
      deviation: 0.2,
      prodOneDemand: 0,
      prodTwoDemand: 0,
      prodThreeDemand: 1,
      discAmount: 300,
    });

    await this.purchasePositionMasterService.create({
      articleId: 24,
      deliveryTime: 3.2,
      deviation: 0.3,
      prodOneDemand: 7,
      prodTwoDemand: 7,
      prodThreeDemand: 7,
      discAmount: 6100,
    });

    await this.purchasePositionMasterService.create({
      articleId: 25,
      deliveryTime: 0.9,
      deviation: 0.2,
      prodOneDemand: 4,
      prodTwoDemand: 4,
      prodThreeDemand: 4,
      discAmount: 3600,
    });

    await this.purchasePositionMasterService.create({
      articleId: 27,
      deliveryTime: 0.9,
      deviation: 0.2,
      prodOneDemand: 2,
      prodTwoDemand: 2,
      prodThreeDemand: 2,
      discAmount: 1800,
    });

    await this.purchasePositionMasterService.create({
      articleId: 28,
      deliveryTime: 1.7,
      deviation: 0.4,
      prodOneDemand: 4,
      prodTwoDemand: 5,
      prodThreeDemand: 6,
      discAmount: 4500,
    });

    await this.purchasePositionMasterService.create({
      articleId: 32,
      deliveryTime: 2.1,
      deviation: 0.5,
      prodOneDemand: 3,
      prodTwoDemand: 3,
      prodThreeDemand: 3,
      discAmount: 2700,
    });

    await this.purchasePositionMasterService.create({
      articleId: 33,
      deliveryTime: 1.9,
      deviation: 0.5,
      prodOneDemand: 0,
      prodTwoDemand: 0,
      prodThreeDemand: 2,
      discAmount: 900,
    });

    await this.purchasePositionMasterService.create({
      articleId: 34,
      deliveryTime: 1.6,
      deviation: 0.3,
      prodOneDemand: 0,
      prodTwoDemand: 0,
      prodThreeDemand: 72,
      discAmount: 22000,
    });

    await this.purchasePositionMasterService.create({
      articleId: 35,
      deliveryTime: 2.2,
      deviation: 0.4,
      prodOneDemand: 4,
      prodTwoDemand: 4,
      prodThreeDemand: 4,
      discAmount: 3600,
    });

    await this.purchasePositionMasterService.create({
      articleId: 36,
      deliveryTime: 1.2,
      deviation: 0.1,
      prodOneDemand: 1,
      prodTwoDemand: 1,
      prodThreeDemand: 1,
      discAmount: 900,
    });

    await this.purchasePositionMasterService.create({
      articleId: 37,
      deliveryTime: 1.5,
      deviation: 0.3,
      prodOneDemand: 1,
      prodTwoDemand: 1,
      prodThreeDemand: 1,
      discAmount: 900,
    });

    await this.purchasePositionMasterService.create({
      articleId: 38,
      deliveryTime: 1.7,
      deviation: 0.4,
      prodOneDemand: 1,
      prodTwoDemand: 1,
      prodThreeDemand: 1,
      discAmount: 300,
    });

    await this.purchasePositionMasterService.create({
      articleId: 39,
      deliveryTime: 1.5,
      deviation: 0.3,
      prodOneDemand: 2,
      prodTwoDemand: 2,
      prodThreeDemand: 2,
      discAmount: 900,
    });

    await this.purchasePositionMasterService.create({
      articleId: 40,
      deliveryTime: 1.7,
      deviation: 0.2,
      prodOneDemand: 1,
      prodTwoDemand: 1,
      prodThreeDemand: 1,
      discAmount: 900,
    });

    await this.purchasePositionMasterService.create({
      articleId: 41,
      deliveryTime: 0.9,
      deviation: 0.2,
      prodOneDemand: 1,
      prodTwoDemand: 1,
      prodThreeDemand: 1,
      discAmount: 900,
    });

    await this.purchasePositionMasterService.create({
      articleId: 42,
      deliveryTime: 1.2,
      deviation: 0.3,
      prodOneDemand: 2,
      prodTwoDemand: 2,
      prodThreeDemand: 2,
      discAmount: 1800,
    });

    await this.purchasePositionMasterService.create({
      articleId: 43,
      deliveryTime: 2.0,
      deviation: 0.5,
      prodOneDemand: 1,
      prodTwoDemand: 1,
      prodThreeDemand: 1,
      discAmount: 1900,
    });

    await this.purchasePositionMasterService.create({
      articleId: 44,
      deliveryTime: 1,
      deviation: 0.2,
      prodOneDemand: 3,
      prodTwoDemand: 3,
      prodThreeDemand: 3,
      discAmount: 2700,
    });

    await this.purchasePositionMasterService.create({
      articleId: 45,
      deliveryTime: 1.7,
      deviation: 0.3,
      prodOneDemand: 1,
      prodTwoDemand: 1,
      prodThreeDemand: 1,
      discAmount: 900,
    });

    await this.purchasePositionMasterService.create({
      articleId: 46,
      deliveryTime: 0.9,
      deviation: 0.3,
      prodOneDemand: 1,
      prodTwoDemand: 1,
      prodThreeDemand: 1,
      discAmount: 900,
    });

    await this.purchasePositionMasterService.create({
      articleId: 47,
      deliveryTime: 1.1,
      deviation: 0.1,
      prodOneDemand: 1,
      prodTwoDemand: 1,
      prodThreeDemand: 1,
      discAmount: 900,
    });

    await this.purchasePositionMasterService.create({
      articleId: 48,
      deliveryTime: 1,
      deviation: 0.2,
      prodOneDemand: 2,
      prodTwoDemand: 2,
      prodThreeDemand: 2,
      discAmount: 1800,
    });

    await this.purchasePositionMasterService.create({
      articleId: 52,
      deliveryTime: 1.6,
      deviation: 0.4,
      prodOneDemand: 2,
      prodTwoDemand: 0,
      prodThreeDemand: 0,
      discAmount: 600,
    });

    await this.purchasePositionMasterService.create({
      articleId: 53,
      deliveryTime: 1.6,
      deviation: 0.2,
      prodOneDemand: 72,
      prodTwoDemand: 0,
      prodThreeDemand: 0,
      discAmount: 22000,
    });

    await this.purchasePositionMasterService.create({
      articleId: 57,
      deliveryTime: 1.7,
      deviation: 0.3,
      prodOneDemand: 0,
      prodTwoDemand: 2,
      prodThreeDemand: 0,
      discAmount: 600,
    });

    await this.purchasePositionMasterService.create({
      articleId: 58,
      deliveryTime: 1.6,
      deviation: 0.5,
      prodOneDemand: 0,
      prodTwoDemand: 72,
      prodThreeDemand: 0,
      discAmount: 22000,
    });

    await this.purchasePositionMasterService.create({
      articleId: 59,
      deliveryTime: 0.7,
      deviation: 0.2,
      prodOneDemand: 2,
      prodTwoDemand: 2,
      prodThreeDemand: 2,
      discAmount: 1800,
    });




    return this.appService.getHello();
  }
}
