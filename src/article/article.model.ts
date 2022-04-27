import {
  BelongsToMany,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { OrdersInWork } from 'src/orders-in-work/orders-in-work.model';
import { ProductionPart } from 'src/production-part/production-part.model';
import { PurchasingPart } from 'src/purchasing-part/purchasing-part.model';
import { WlWorkstation } from 'src/wl-workstation/wl-workstation.model';
import { WlWorkstationModule } from 'src/wl-workstation/wl-workstation.module';
import { ArticleInterface } from './article.interface';

@Table
export class Article extends Model implements ArticleInterface {
  @PrimaryKey
  @Column
  id: number;

  @Column
  amount: number;

  @Column
  startAmount: number;

  @Column
  pct: number;

  @Column
  price: number;

  @Column
  stockvalue: number;

  @Column
  maxDeliveryTime: number;

  @Column
  discAmount: number;

  @BelongsToMany(() => Article, {
    as: 'childPurchasingArticles',
    foreignKey: 'parentArticleId',
    otherKey: 'childArticleId',
    through: () => PurchasingPart,
  })
  purchasingArticles: Article[];

  @BelongsToMany(() => Article, {
    as: 'childProductionArticles',
    foreignKey: 'parentArticleId',
    otherKey: 'childArticleId',
    through: () => ProductionPart,
  })
  childProductionArticles: Article[];

  @HasMany(() => OrdersInWork)
  ordersInWork: OrdersInWork[];

  @HasMany( () => WlWorkstation)
  waitingList: WlWorkstation[];
}
