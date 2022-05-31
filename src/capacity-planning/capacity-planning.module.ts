import { Module } from '@nestjs/common';
import { CapacityPlanningService } from './capacity-planning.service';
import { CapacityPlanningController } from './capacity-planning.controller';
import { CapacityPlanning } from './capacity-planning.model';
import { SequelizeModule } from '@nestjs/sequelize/dist/sequelize.module';
import { Workplace } from 'src/workplace/workplace.model';
import { WorkplaceService } from 'src/workplace/workplace.service';
import { WorkplaceModule } from 'src/workplace/workplace.module';
import { DispositionModule } from 'src/disposition/disposition.module';
import { CapacityPlanningFieldModule } from 'src/capacity-planning-field/capacity-planning-field.module';
import { PlanningFieldPositionModule } from 'src/planning-field-position/planning-field-position.module';
import { OrdersInWorkModule } from 'src/orders-in-work/orders-in-work.module';
import { ArticleModule } from 'src/article/article.module';

@Module({
  providers: [CapacityPlanningService],
  controllers: [CapacityPlanningController],
  imports: [
    SequelizeModule.forFeature([CapacityPlanning, Workplace]),
    WorkplaceModule,
    DispositionModule,
    CapacityPlanningFieldModule,
    PlanningFieldPositionModule,
    ArticleModule
  ],
})
export class CapacityPlanningModule {}
