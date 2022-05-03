import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize/dist/sequelize.module';
import { CapacityPlanningField } from './capacity-planning-field.model';
import { CapacityPlanningFieldService } from './capacity-planning-field.service';

@Module({
  providers: [CapacityPlanningFieldService],
  imports: [
    SequelizeModule.forFeature([CapacityPlanningField]),
  ],
})
export class CapacityPlanningFieldModule {}
