import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { CapacityPlanningField } from "src/capacity-planning-field/capacity-planning-field.model";
import { CapacityPlanning } from "src/capacity-planning/capacity-planning.model";
import { ProductionStep } from "src/production-step/production-step-model";

@Table
export class PlanningFieldPosition extends Model {
    @PrimaryKey
    @ForeignKey(() => CapacityPlanningField)
    @Column
    planningPeriod: number;

    @PrimaryKey
    @ForeignKey(()=> CapacityPlanningField)
    @ForeignKey(()=> ProductionStep)
    @Column
    workplace: number;

    @PrimaryKey
    @Column
    @ForeignKey(()=>ProductionStep)
    articleId: number;

    @BelongsTo(()=>ProductionStep)
    productionStep: ProductionStep;

    @Column
    processTime: number;

    @Column
    setupTime: number;

    @Column
    planningFieldId: string;
}