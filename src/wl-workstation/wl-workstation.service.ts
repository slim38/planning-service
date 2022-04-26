import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WlWorkstation } from './wl-workstation.model';
import { WlWorkstationModule } from './wl-workstation.module';

@Injectable()
export class WlWorkstationService {
    constructor(
        @InjectModel(WlWorkstation)
        private model: typeof WlWorkstation
    ) {}

    async create(template: any){
        await this.model.create(template);
    }
}
