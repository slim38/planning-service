import { AutoIncrement, BelongsTo, Column, ForeignKey, HasMany, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Article } from "src/article/article.model";
import { DispositionField } from "src/disposition-field/disposition-field.model";

@Table
export class Disposition extends Model {
    @PrimaryKey
    @Column
    id: string
    
    @Column
    period: number;

    @Column
    @ForeignKey(()=>Article)
    salesArticleId: number;

    @BelongsTo( () => Article )
    salesArticle: Article;

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

    @HasMany( () => DispositionField, {
        onDelete: 'CASCADE',
    })
    fields: DispositionField[];
}