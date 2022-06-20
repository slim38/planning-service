import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table
export class DirectSell extends Model {
    @PrimaryKey
    @Column
    period: number;

    @PrimaryKey
    @Column
    Produkt: number;

    @Column
    Preis: number;

    @Column
    Menge: number;

    @Column
    Konventionalstrafe: number;
}