import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Forecast } from './forecast.model';
import { ForecastService } from './forecast.service';
import { ForecastController } from './forecast.controller';
import { DispositionModule } from 'src/disposition/disposition.module';
import { CapacityPlanningModule } from 'src/capacity-planning/capacity-planning.module';

@Module({
    imports: [
        SequelizeModule.forFeature([Forecast]),
        DispositionModule,
        CapacityPlanningModule
    ],
    providers: [ForecastService],
    controllers: [ForecastController],
    exports: [ForecastService]
})
export class ForecastModule {}
