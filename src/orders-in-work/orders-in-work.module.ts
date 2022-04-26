import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersInWork } from './orders-in-work.model';
import { OrdersInWorkService } from './orders-in-work.service';

@Module({
  providers: [OrdersInWorkService],
  imports: [SequelizeModule.forFeature([OrdersInWork])],
  exports: [OrdersInWorkService]
})
export class OrdersInWorkModule {}
