import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize/dist/sequelize.module';
import { Workplace } from './workplace.model';
import { WorkplaceService } from './workplace.service';

@Module({
  providers: [WorkplaceService],
  imports: [
    SequelizeModule.forFeature([Workplace]),
  ],
  exports: [WorkplaceService]
})
export class WorkplaceModule {}
