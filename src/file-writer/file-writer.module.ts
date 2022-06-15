import { Module } from '@nestjs/common';
import { DispositionModule } from 'src/disposition/disposition.module';
import { PurchasePlanningModule } from 'src/purchase-planning/purchase-planning.module';
import { FileWriterService } from './file-writer.service';
import { FileWriterController } from './file-writer.controller';

@Module({
  providers: [FileWriterService],
  imports: [
    PurchasePlanningModule,
    DispositionModule
  ],
  controllers: [FileWriterController]
})
export class FileWriterModule {}
