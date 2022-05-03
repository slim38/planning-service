import { Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Article } from "src/article/article.model";
import { Workplace } from "src/workplace/workplace.model";

@Table
export class ProductionStep extends Model {
    @PrimaryKey
    @ForeignKey(()=>Workplace)
    @Column
    workplace: number;

    @PrimaryKey
    @ForeignKey( () => Article)
    @Column
    articleId: number;

    @Column
    processTime: number;

    @Column
    setupTime: number;
}