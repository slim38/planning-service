import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ProductionStep } from "src/production-step/production-step-model";

@Table
export class Workplace extends Model {
    @PrimaryKey
    @Column
    id: number;

    @HasMany(()=>ProductionStep, 'workplace')
    productionSteps: ProductionStep[];
}