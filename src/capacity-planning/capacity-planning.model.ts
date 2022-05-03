import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { CapacityPlanningField } from "src/capacity-planning-field/capacity-planning-field.model";

@Table
export class CapacityPlanning extends Model {
    @PrimaryKey
    @Column
    period: number;
    
    @Column
    averageWorkload: number;

    @HasMany(()=> CapacityPlanningField, 'planningPeriod')
    fields: CapacityPlanningField[];
}