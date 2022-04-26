import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WlWorkstation } from './wl-workstation.model';

@Module({
    imports: [SequelizeModule.forFeature([WlWorkstation])],
})
export class WlWorkstationModule {}
