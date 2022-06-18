import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BatchPosition } from './batch-position.model';

@Injectable()
export class BatchPositionService {
    constructor(
        @InjectModel(BatchPosition)
        private readonly model: typeof BatchPosition
    ) {}

    async upsert(templ) {
        await this.model.upsert(templ);
    }
}
