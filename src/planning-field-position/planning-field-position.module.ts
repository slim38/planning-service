import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PlanningFieldPosition } from './planning-field-position.model';
import { PlanningFieldPositionService } from './planning-field-position.service';

@Module({
  providers: [PlanningFieldPositionService],
  imports: [SequelizeModule.forFeature([PlanningFieldPosition])],
  exports: [PlanningFieldPositionService]
})
export class PlanningFieldPositionModule {}
