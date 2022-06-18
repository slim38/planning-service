import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BatchPosition } from './batch-position.model';
import { BatchPositionService } from './batch-position.service';

@Module({
  providers: [BatchPositionService],
  imports: [
    SequelizeModule.forFeature([BatchPosition])
  ],
  exports: [BatchPositionService]
})
export class BatchPositionModule {}
