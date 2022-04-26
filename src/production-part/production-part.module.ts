import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductionPart } from './production-part.model';
import { ProductionPartService } from './production-part.service';

@Module({
    imports: [SequelizeModule.forFeature([ProductionPart])],
    providers: [ProductionPartService],
    exports: [ProductionPartService]
})
export class ProductionPartModule {}
