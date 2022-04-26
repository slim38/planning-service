import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrdersInWork } from './orders-in-work.model';

@Injectable()
export class OrdersInWorkService {
  constructor(
    @InjectModel(OrdersInWork)
    private model: typeof OrdersInWork,
  ) {}

  async create(template: any) {
    this.model.sync();
    await this.model.create(template);
  }

  async getAll(){
    return await this.model.findAll();
  }
}
