import { BelongsToMany, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Col } from "sequelize/types/utils";
import { CapacityPlanning } from "src/capacity-planning/capacity-planning.model";
import { PlanningFieldPosition } from "src/planning-field-position/planning-field-position.model";
import { ProductionStep } from "src/production-step/production-step-model";

@Table
export class CapacityPlanningField extends Model {
    @PrimaryKey
    @Column
    id: string;
    
    @ForeignKey(() => CapacityPlanning)
    @Column
    planningPeriod: number;

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

    @HasMany( () => PlanningFieldPosition, 'planningFieldId' )
    positions: PlanningFieldPosition[];
}