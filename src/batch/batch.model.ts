import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { BatchPosition } from "src/batch-position/batch-position.model";

@Table
export class Batch extends Model {
    @PrimaryKey
    @Column
    period: number;

    @HasMany(() => BatchPosition)
    dispos: BatchPosition[];
}