import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table
export class DirectSell extends Model {
    @PrimaryKey
    @Column
    period: 7;

    @Column
    Produkt: number;

    @Column
    Preis: number;

    @Column
    Menge: number;

    @Column
    Konventionalstrfe: number;
}