import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Forecast } from './forecast.model';
import { ForecastService } from './forecast.service';
import { ForecastController } from './forecast.controller';

@Module({
    imports: [
        SequelizeModule.forFeature([Forecast]),
    ],
    providers: [ForecastService],
    controllers: [ForecastController],
    exports: [ForecastService]
})
export class ForecastModule {}
