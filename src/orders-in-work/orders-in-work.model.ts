import { Column, ForeignKey, PrimaryKey } from 'sequelize-typescript';
import { Model } from 'sequelize-typescript/dist/model/model/model';
import { Table } from 'sequelize-typescript/dist/model/table/table';
import { Article } from 'src/article/article.model';
import { OrdersInWorkInterface } from './orders-in-work.interface';

@Table
export class OrdersInWork extends Model implements OrdersInWorkInterface {
  @PrimaryKey
  @Column
  id: number;

  @PrimaryKey
  @Column
  period: number;

  @Column
  order: number;

  @Column
  batch: number;

  @Column
  @ForeignKey(() => Article)
  articleId: number;

  @Column
  amount: number;

  @Column
  timeneed: number;
}
