/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductionPart } from './production-part/production-part.model';
import { ProductionPartService } from './production-part/production-part.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly productionPartService: ProductionPartService) {}

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



    





    return this.appService.getHello();
  }
}
