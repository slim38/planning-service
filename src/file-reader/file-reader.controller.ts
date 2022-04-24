/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, HttpCode, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import  xml2js, { Parser }  from 'xml2js';

@Controller('file-reader')
export class FileReaderController {

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        const xmlStr = file.buffer.toString();
        
        console.log(file.buffer.toString());

        const parser = new Parser();
        const json = await parser.parseStringPromise(xmlStr);

        console.log('\n ---- JSON ---- \n');

        console.log(JSON.stringify(json));

        return json.results;
    }
}
