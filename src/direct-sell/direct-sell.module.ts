import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DirectSell } from './direct-sell.model';
import { DirectSellService } from './direct-sell.service';
import { DirectSellController } from './direct-sell.controller';

@Module({
  providers: [DirectSellService],
  imports: [
    SequelizeModule.forFeature([DirectSell])
  ],
  controllers: [DirectSellController],
  exports: [DirectSellService]
})
export class DirectSellModule {}
