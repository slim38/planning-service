import { BelongsTo, Column, ForeignKey, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Col } from "sequelize/types/utils";
import { Article } from "src/article/article.model";

@Table
export class PurchasePositionMasterModel extends Model {
    @PrimaryKey
    @ForeignKey(() => Article)
    @Column
    articleId: number;

    @BelongsTo(() => Article)
    article: Article;

    @Column
    deliveryTime: number;

    @Column
    deviation: number;

    @Column
    prodOneDemand: number;

    @Column
    prodTwoDemand: number;

    @Column
    prodThreeDemand: number;

    @Column
    discAmount: number;
}