import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrdersInWorkInterface } from './orders-in-work.interface';
import { OrdersInWork } from './orders-in-work.model';

@Injectable()
export class OrdersInWorkService {
  constructor(
    @InjectModel(OrdersInWork)
    private model: typeof OrdersInWork,
  ) {}

  async bulkCreate(OIWs: OrdersInWorkInterface[]){
    const plainOIWs: any[] = OIWs;
    await this.model.bulkCreate(plainOIWs, {
      updateOnDuplicate: ['amount']
    });
  }

  async getAll(){
    return await this.model.findAll();
  }

  async findByArticleId(articleId: number) {
    return await this.model.findAll({
      where: {
      articleId
      }
    });
  }

  async deleteByPeriod(period: number) {
    await this.model.destroy({
      where: {
        period
      }
    });
  }
}
