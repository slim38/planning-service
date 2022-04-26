import { Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Article } from 'src/article/article.model';

@Table
export class WlWorkstation extends Model {
  @PrimaryKey
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
  lastbach: number;

  @Column
  @ForeignKey( () => Article)
  articleId: number;

  @Column
  amount: number;

  @Column
  timeneed: number;
}
