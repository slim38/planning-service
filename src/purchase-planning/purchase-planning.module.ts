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
      PurchasePositionModel
    ]),
    PurchasePositionMasterModule,
    PurchasePositionModule,
  ],
  exports: [
    PurchasePlanningService,
  ],
  controllers: [PurchasePlanningController]
})
export class PurchasePlanningModule {}
