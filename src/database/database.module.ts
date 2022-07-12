import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Article } from 'src/article/article.model';
import { BatchPosition } from 'src/batch-position/batch-position.model';
import { Batch } from 'src/batch/batch.model';
import { CapacityPlanningField } from 'src/capacity-planning-field/capacity-planning-field.model';
import { CapacityPlanning } from 'src/capacity-planning/capacity-planning.model';
import { DirectSell } from 'src/direct-sell/direct-sell.model';
import { DispositionField } from 'src/disposition-field/disposition-field.model';
import { Disposition } from 'src/disposition/disposition.model';
import { Forecast } from 'src/forecast/forecast.model';
import { FuturInward } from 'src/future-invard/future-invard.model';
import { OrdersInWork } from 'src/orders-in-work/orders-in-work.model';
import { PlanningFieldPosition } from 'src/planning-field-position/planning-field-position.model';
import { ProductionPart } from 'src/production-part/production-part.model';
import { ProductionStep } from 'src/production-step/production-step-model';
import { PurchasePlanningModel } from 'src/purchase-planning/purchase-planning.model';
import { PurchasePositionMasterModel } from 'src/purchase-position-master/purchase-position-master.model';
import { PurchasePositionModel } from 'src/purchase-position/purchase-position.model';
import { PurchasingPart } from 'src/purchasing-part/purchasing-part.model';
import { WlWorkstation } from 'src/wl-workstation/wl-workstation.model';
import { Workplace } from 'src/workplace/workplace.model';
import { parse } from 'url';

@Module({})
export class DatabaseModule {
    static forRoot() {
    const { CLEARDB_DATABASE_URL } = process.env;
    const dbUrl = parse(CLEARDB_DATABASE_URL);
    const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
    const password = dbUrl.auth.substr(
    dbUrl.auth.indexOf(':') + 1,
    dbUrl.auth.length
    );
    const dbName = dbUrl.path.slice(1);
    const host = dbUrl.hostname;
    const { port } = dbUrl;
    const portNr = parseInt(port);

    return SequelizeModule.forRoot({
        dialect: 'postgres',
        host,
        port: portNr,
        username,
        password,
        database: dbName,
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false
            }
        },
        models: [
          Article,
          PurchasingPart,
          ProductionPart,
          WlWorkstation,
          OrdersInWork,
          Disposition,
          DispositionField,
          Workplace,
          ProductionStep,
          CapacityPlanning,
          CapacityPlanningField,
          PlanningFieldPosition,
          FuturInward,
          PurchasePlanningModel,
          PurchasePositionModel,
          PurchasePositionMasterModel,
          Forecast,
          DirectSell,
          Batch,
          BatchPosition
        ],
      });
    }
}
