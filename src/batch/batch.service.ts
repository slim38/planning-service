import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BatchPosition } from 'src/batch-position/batch-position.model';
import { BatchPositionService } from 'src/batch-position/batch-position.service';
import { Batch } from './batch.model';

@Injectable()
export class BatchService {
    constructor(
        @InjectModel(Batch)
        private readonly model: typeof Batch,
        private readonly positionService: BatchPositionService
    ) {}

    async create(templ) {
        const period = templ.period;
        await this.model.destroy({
            where: {
                period
            }
        });

        await this.model.create(templ);

        const batchPos = Object.entries(templ.dispo);
        
        for (let [key, value] of batchPos) {
            await this.positionService.upsert(value);
        }
    }

    async getByPeriod(period: number) {
        return await this.model.findAll({
            where: {
                period
            },
            include: [BatchPosition]
        });
    }
}
