import { BelongsToMany, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Col } from "sequelize/types/utils";
import { CapacityPlanning } from "src/capacity-planning/capacity-planning.model";
import { ProductionStep } from "src/production-step/production-step-model";

@Table
export class CapacityPlanningField extends Model {
    @PrimaryKey
    @ForeignKey(() => CapacityPlanning)
    @Column
    planningPeriod: number;

    @PrimaryKey
    @Column
    workplace: number;

    @Column
    capacityNeedNew: number;

    @Column
    totalSetUpTimeNew: number;

    @Column
    capacityNeedPrev: number;

    @Column
    totalSetUpTimePrev: number;

    @Column
    totalCapacityNeed: number;
    
    @Column
    shifts: number;

    @Column
    overtime: number;
}