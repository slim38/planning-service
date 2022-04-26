import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Article as Article } from './article.model';
import { ArticleService } from './article.service';

@Module({
    imports: [
        SequelizeModule.forFeature([Article])
    ],
    providers: [ArticleService],
    exports: [ArticleService]
})
export class ArticleModule {}
