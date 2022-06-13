import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PurchasePositionMasterModel } from 'src/purchase-position-master/purchase-position-master.model';
import { PurchasePositionMasterModule } from 'src/purchase-position-master/purchase-position-master.module';
import { PurchasePositionMasterService } from 'src/purchase-position-master/purchase-position-master.service';
import { PurchasePositionModel } from 'src/purchase-position/purchase-position.model';
import { PurchasePositionModule } from 'src/purchase-position/purchase-position.module';
import { PurchasePositionService } from 'src/purchase-position/purchase-position.service';
import { PurchasePlanningModel } from './purchase-planning.model';
import { PurchasePlanningService } from './purchase-planning.service';
import { PurchasePlanningController } from './purchase-planning.controller';
import { Forecast } from 'src/forecast/forecast.model';
import { ForecastService } from 'src/forecast/forecast.service';
import { ForecastModule } from 'src/forecast/forecast.module';

@Module({
  providers: [
    PurchasePlanningService,
    PurchasePositionMasterService,
    PurchasePositionService,
  ],
  imports: [
    SequelizeModule.forFeature([
      PurchasePlanningModel,
      PurchasePositionMasterModel,
      PurchasePositionModel,
      Forecast
    ]),
    PurchasePositionMasterModule,
    PurchasePositionModule,
    ForecastModule
  ],
  exports: [
    PurchasePlanningService,
  ],
  controllers: [PurchasePlanningController]
})
export class PurchasePlanningModule {}
