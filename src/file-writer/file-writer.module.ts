import { Module } from '@nestjs/common';
import { DispositionModule } from 'src/disposition/disposition.module';
import { PurchasePlanningModule } from 'src/purchase-planning/purchase-planning.module';
import { FileWriterService } from './file-writer.service';
import { FileWriterController } from './file-writer.controller';
import { DirectSellService } from 'src/direct-sell/direct-sell.service';
import { DirectSellModule } from 'src/direct-sell/direct-sell.module';
import { ForecastModule } from 'src/forecast/forecast.module';
import { CapacityPlanning } from 'src/capacity-planning/capacity-planning.model';
import { CapacityPlanningModule } from 'src/capacity-planning/capacity-planning.module';

@Module({
  providers: [FileWriterService],
  imports: [
    PurchasePlanningModule,
    DispositionModule,
    DirectSellModule,
    ForecastModule,
    CapacityPlanningModule,
  ],
  controllers: [FileWriterController]
})
export class FileWriterModule {}
