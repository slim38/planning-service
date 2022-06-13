import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table
export class Forecast extends Model {
    @PrimaryKey
    @Column
    period: number;

    @Column
    firstP1: number;

    @Column
    firstP2: number;
        
    @Column
    firstP3: number;

    @Column
    secondP1: number;

    @Column
    secondP2: number;
    
    @Column
    secondP3: number;
    
    @Column
    thirdP1: number;
    
    @Column
    thirdP2: number;
    
    @Column
    thirdP3: number;

    @Column
    fourthP1: number;
    
    @Column
    fourthP2: number;
    
    @Column
    fourthp3: number;
}