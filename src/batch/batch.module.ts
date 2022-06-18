import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Batch } from './batch.model';
import { BatchService } from './batch.service';
import { BatchController } from './batch.controller';
import { BatchPositionModule } from 'src/batch-position/batch-position.module';

@Module({
  providers: [BatchService],
  imports: [
    SequelizeModule.forFeature([Batch]),
    BatchPositionModule
  ],
  exports: [BatchService],
  controllers: [BatchController]
})
export class BatchModule {}
