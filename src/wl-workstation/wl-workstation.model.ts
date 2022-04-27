import { AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Article } from 'src/article/article.model';
import { WlWorkstationInterface } from './wl-workstation.interface';

@Table
export class WlWorkstation extends Model implements WlWorkstationInterface {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  workplaceId: number;

  @Column
  period: number;

  @Column
  order: number;

  @Column
  firstbatch: number;

  @Column
  lastbatch: number;

  @Column
  @ForeignKey( () => Article)
  articleId: number;

  @Column
  amount: number;

  @Column
  timeneed: number;
}
