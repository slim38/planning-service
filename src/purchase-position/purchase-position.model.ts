import { BelongsTo, Column, ForeignKey, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { PurchasePlanningModel } from "src/purchase-planning/purchase-planning.model";
import { PurchasePositionMasterModel } from "src/purchase-position-master/purchase-position-master.model";
import { PurchasePositionMasterModule } from "src/purchase-position-master/purchase-position-master.module";

export enum OrderType { Normal, Eil }

@Table
export class PurchasePositionModel extends Model {
    @PrimaryKey
    @ForeignKey(() => PurchasePlanningModel)
    @Column
    period: number;

    @Column
    incomingOrder: number;

    @Column
    firstDemand: number;

    @Column
    secondDemand: number;

    @Column
    thirdDemand: number;

    @Column
    fourthDemand: number;

    @Column
    orderAmount: number;

    @Column
    orderType: OrderType;

    @PrimaryKey
    @Column
    @ForeignKey(() => PurchasePositionMasterModel)
    articleId: number;

    @BelongsTo(() => PurchasePositionMasterModel)
    positionMaster: PurchasePositionMasterModel;
}