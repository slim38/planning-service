import { OrdersInWorkInterface } from "src/orders-in-work/orders-in-work.interface";
import { WlWorkstationInterface } from "src/wl-workstation/wl-workstation.interface";
import { ArticleInterface } from "./article.interface";

export class ArticleTemplate implements ArticleInterface {
    id: number;
  
    amount: number;
  
    startAmount: number;
  
    pct: number;
  
    price: number;
  
    stockvalue: number;
  
    maxDeliveryTime: number;
  
    discAmount: number;

  }