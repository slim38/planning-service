import { Module } from '@nestjs/common';
import { FileReaderController } from './file-reader.controller';

@Module({
  controllers: [FileReaderController]
})
export class FileReaderModule {}
