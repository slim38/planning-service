import { Module } from '@nestjs/common';
import { CapacityPlanningService } from './capacity-planning.service';
import { CapacityPlanningController } from './capacity-planning.controller';
import { CapacityPlanning } from './capacity-planning.model';
import { SequelizeModule } from '@nestjs/sequelize/dist/sequelize.module';
import { Workplace } from 'src/workplace/workplace.model';
import { WorkplaceService } from 'src/workplace/workplace.service';
import { WorkplaceModule } from 'src/workplace/workplace.module';
import { DispositionModule } from 'src/disposition/disposition.module';

@Module({
  providers: [CapacityPlanningService],
  controllers: [CapacityPlanningController],
  imports: [
    SequelizeModule.forFeature([CapacityPlanning, Workplace]),
    WorkplaceModule,
    DispositionModule,
  ],
})
export class CapacityPlanningModule {}
