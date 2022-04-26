import { AutoIncrement, BelongsTo, Column, ForeignKey, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Article } from "src/article/article.model";
import { Disposition } from "src/disposition/disposition.model";

@Table
export class DispositionField extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    @ForeignKey( () => Disposition )
    dispositionId: string;

    @Column
    salesOrderCount: number;

    @Column
    plannedStock: number;

    @Column
    currentStock: number;

    @Column
    waitinglistOrderCount: number;

    @Column
    ordersInWorkCount: number;

    @Column
    productionOrderCount: number;

    @Column
    @ForeignKey( () => Article)
    articleId: number;

    @BelongsTo(() => Article)
    article: Article;
}