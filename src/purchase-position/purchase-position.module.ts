import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PurchasePositionModel } from './purchase-position.model';
import { PurchasePositionService } from './purchase-position.service';

@Module({
  providers: [PurchasePositionService],
  imports: [SequelizeModule.forFeature([PurchasePositionModel])],
})
export class PurchasePositionModule {}
