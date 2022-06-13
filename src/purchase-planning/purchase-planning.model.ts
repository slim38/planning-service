import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { PurchasePositionModel } from "src/purchase-position/purchase-position.model";

@Table
export class PurchasePlanningModel extends Model {
    @PrimaryKey
    @Column
    period: number;

    @HasMany(() => PurchasePositionModel)
    positions: PurchasePositionModel[];
}