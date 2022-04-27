import { OrdersInWorkInterface } from "src/orders-in-work/orders-in-work.interface";
import { OrdersInWork } from "src/orders-in-work/orders-in-work.model";
import { WlWorkstationInterface } from "src/wl-workstation/wl-workstation.interface";
import { WlWorkstation } from "src/wl-workstation/wl-workstation.model";

export interface ArticleInterface {
  id: number;

  amount: number;

  startAmount: number;

  pct: number;

  price: number;

  stockvalue: number;

  maxDeliveryTime?: number;

  discAmount?: number;

  purchasingArticles?: ArticleInterface[];

  childProductionArticles?: ArticleInterface[];

  ordersInWork?: OrdersInWorkInterface[];

  waitingList?: WlWorkstationInterface[];
}