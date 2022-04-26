import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Article } from "src/article/article.model";

@Table
export class ProductionPart extends Model {
    @ForeignKey( () => Article )
    @Column
    parentArticleId: number;

    @ForeignKey( () => Article )
    @Column
    childArticleId: number;
}