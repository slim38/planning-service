import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DirectSell } from './direct-sell.model';

@Injectable()
export class DirectSellService {
    constructor(
        @InjectModel(DirectSell)
        private readonly model: typeof DirectSell,
    ) {}

    async create(template: any) {
        const period = template.period;

        await this.model.destroy({
            where: {
                period
            }
        })

        if (template.Direkt1.Produkt) {
            await this.model.create({
                period,
                ...template.Direkt1
            });
        }

        if (template.Direkt2.Produkt) {
            await this.model.create({
                period,
                ...template.Direkt2
            });
        }

        if (template.Direkt3.Produkt) {
            await this.model.create({
                period,
                ...template.Direkt3
            });
        }

        return await this.model.findAll({
            where: {
                period
            }
        });
    }

    async findByPeriod(period: number) {
        return await this.model.findAll({
            where: {
                period
            }
        })
    }
}
