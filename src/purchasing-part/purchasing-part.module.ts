import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PurchasingPart } from './purchasing-part.model';
import { PurchasingPartService } from './purchasing-part.service';

@Module({
    imports: [SequelizeModule.forFeature([PurchasingPart])],
    providers: [PurchasingPartService],
    exports: [PurchasingPartModule]
})
export class PurchasingPartModule {}
