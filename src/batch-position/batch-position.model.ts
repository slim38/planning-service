import { Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Col } from "sequelize/types/utils";
import { Batch } from "src/batch/batch.model";

@Table
export class BatchPosition extends Model{
    @PrimaryKey
    @ForeignKey(() => Batch)
    @Column
    period: number;

    @PrimaryKey
    @Column
    article: number;

    @Column
    amount1: number;

    @Column
    position1: number;

    @Column
    amount2: number;

    @Column
    position2: number;
}