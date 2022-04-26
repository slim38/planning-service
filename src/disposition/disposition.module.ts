import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Article } from 'src/article/article.model';
import { ArticleModule } from 'src/article/article.module';
import { ArticleService } from 'src/article/article.service';
import { DispositionField } from 'src/disposition-field/disposition-field.model';
import { DispositionFieldModule } from 'src/disposition-field/disposition-field.module';
import { DispositionFieldService } from 'src/disposition-field/disposition-field.service';
import { Disposition } from './disposition.model';
import { DispositionService } from './disposition.service';

@Module({
    imports: [
        SequelizeModule.forFeature([Disposition, DispositionField, Article]),
        DispositionFieldModule,
        ArticleModule
    ],
    providers: [
        DispositionService,
        DispositionFieldService,
        ArticleService
    ],
    exports: [
        DispositionService
    ]
})
export class DispositionModule {}
