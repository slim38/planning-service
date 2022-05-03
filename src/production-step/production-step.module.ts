import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize/dist/sequelize.module';
import { ProductionStep } from './production-step-model';
import { ProductionStepService } from './production-step.service';

@Module({
  providers: [ProductionStepService],
  imports: [
    SequelizeModule.forFeature([ProductionStep]),
  ],
})
export class ProductionStepModule {}
