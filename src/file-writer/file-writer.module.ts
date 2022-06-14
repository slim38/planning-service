import { Module } from '@nestjs/common';
import { FileWriterService } from './file-writer.service';

@Module({
  providers: [FileWriterService]
})
export class FileWriterModule {}
