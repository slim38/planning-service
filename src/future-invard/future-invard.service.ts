import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FuturInward } from './future-invard.model';

@Injectable()
export class FutureInvardService {
    constructor(
        @InjectModel(FuturInward)
        private readonly model: typeof FuturInward,
    ) {}

    async bulkCreate(template: any[]) {
        return await this.model.bulkCreate(template, {
            updateOnDuplicate: ['mode']
        });
    }

    async deleteAll() {
        return await this.model.destroy({
            where: {},
            truncate: true
        });
    }
}
