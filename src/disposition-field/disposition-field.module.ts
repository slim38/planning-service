import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DispositionField } from './disposition-field.model';
import { DispositionFieldService } from './disposition-field.service';

@Module({
    imports: [SequelizeModule.forFeature([DispositionField])],
    providers: [DispositionFieldService],
    exports: [DispositionFieldService]
})
export class DispositionFieldModule {}
