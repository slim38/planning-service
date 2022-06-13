import { Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Article } from "src/article/article.model";

@Table
export class FuturInward extends Model {
    @Column
    orderperiod: number;
    
    @PrimaryKey
    @Column
    id: number;
    
    @Column
    mode: number;
    
    @Column
    @ForeignKey(() => Article)
    articleId: number;
    
    @Column
    amount: number;
}