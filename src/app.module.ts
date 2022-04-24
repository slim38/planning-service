/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileReaderModule } from './file-reader/file-reader.module';

@Module({
  imports: [FileReaderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
