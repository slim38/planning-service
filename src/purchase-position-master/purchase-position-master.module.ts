import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PurchasePositionMasterModel } from './purchase-position-master.model';
import { PurchasePositionMasterService } from './purchase-position-master.service';

@Module({
  providers: [PurchasePositionMasterService],
  imports: [SequelizeModule.forFeature([PurchasePositionMasterModel])],
  exports: [PurchasePositionMasterService]
})
export class PurchasePositionMasterModule {}
