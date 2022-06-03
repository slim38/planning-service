import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WlWorkstationInterface } from './wl-workstation.interface';
import { WlWorkstation } from './wl-workstation.model';
import { WlWorkstationModule } from './wl-workstation.module';

@Injectable()
export class WlWorkstationService {
    constructor(
        @InjectModel(WlWorkstation)
        private model: typeof WlWorkstation
    ) {}

    async bulkCreate(WLs: WlWorkstationInterface[]){
        const plainWLs: any[] = WLs
        await this.model.bulkCreate(plainWLs);
    }

    async deleteByPeriod(period: number) {
        await this.model.destroy({
            where: {
                period,
            }
        });
    }
}
