import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FuturInward } from './future-invard.model';
import { FutureInvardService } from './future-invard.service';

@Module({
  providers: [FutureInvardService],
  imports: [SequelizeModule.forFeature([FuturInward])],
})
export class FutureInvardModule {}
