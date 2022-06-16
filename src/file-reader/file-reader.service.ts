import { Injectable } from '@nestjs/common';
import { ArticleInterface } from 'src/article/article.interface';
import { ArticleService } from 'src/article/article.service';
import { CapacityPlanning } from 'src/capacity-planning/capacity-planning.model';
import { CapacityPlanningService } from 'src/capacity-planning/capacity-planning.service';
import { DispositionService } from 'src/disposition/disposition.service';
import { Forecast } from 'src/forecast/forecast.model';
import { ForecastService } from 'src/forecast/forecast.service';
import { FutureInvardService } from 'src/future-invard/future-invard.service';
import { OrdersInWorkInterface } from 'src/orders-in-work/orders-in-work.interface';
import { OrdersInWorkService } from 'src/orders-in-work/orders-in-work.service';
import { PurchasePlanningService } from 'src/purchase-planning/purchase-planning.service';
import { WlWorkstationInterface } from 'src/wl-workstation/wl-workstation.interface';
import { WlWorkstationService } from 'src/wl-workstation/wl-workstation.service';

@Injectable()
export class FileReaderService {
    constructor(
        private articleService: ArticleService,
        private oiwService: OrdersInWorkService,
        private wlService: WlWorkstationService,
        private dispoService: DispositionService,
        private capacityService: CapacityPlanningService,
        private futureInvardService: FutureInvardService,
        private purchasePlanning: PurchasePlanningService,
        private forecastService: ForecastService,
    ) {}

    async initNewPeriod(json: any){ //TODO: Define Type
        const period =  json.results.$.period;
        await this.updateDatabase(json, period);
        const forecastP1 = json.results.forecast[0].$.p1;
        const forecastP2 = json.results.forecast[0].$.p2;
        const forecastP3 = json.results.forecast[0].$.p3;

        await this.forecastService.update({
            period,
            firstP1: forecastP1,
            firstP2: forecastP2,
            firstP3: forecastP3,
        });
        
    }

    private async updateDatabase(json: any, period: number){ //TODO: Define Type
        this.dispoService.deleteByPeriod(period);
        this.capacityService.deleteByPeriod(period);
        this.oiwService.deleteByPeriod(period);
        this.wlService.deleteByPeriod(period);
        this.futureInvardService.deleteAll();
        
        const articles: ArticleInterface[] = this.extractArticlesFromJson(json);
        const OIWs: OrdersInWorkInterface[] = this.extractOIWFromJson(json);
        const wlWorkstations: WlWorkstationInterface[] = this.extractWlWorkstationFromJson(json);
        const inwards = this.extractInwards(json);

        await this.articleService.bulkCreate(articles);
        await this.oiwService.bulkCreate(OIWs);
        await this.wlService.bulkCreate(wlWorkstations);
        await this.futureInvardService.bulkCreate(inwards);
    }

    private extractArticlesFromJson(json: any){ //TODO: Define Type
        const articles: ArticleInterface[] = [];

        json.results.warehousestock[0].article.forEach(article =>
            articles.push(article.$)
        );

        return articles;
    }

    private extractOIWFromJson(json: any){ //TODO: Define Type
        const OIWs: OrdersInWorkInterface[] = [];

        json.results.ordersinwork[0].workplace.forEach(OIW => {
            const mappedOIW: OrdersInWorkInterface = {
                id: OIW.$.id,
                period: OIW.$.period,
                order: OIW.$.order,
                batch: OIW.$.batch,
                articleId: OIW.$.item,
                amount: OIW.$.amount,
                timeneed: OIW.$.timeneed,
            };
            OIWs.push(mappedOIW);
        });

        console.log(JSON.stringify(OIWs));

        return OIWs;
    }

    private extractWlWorkstationFromJson(json: any){ //TODO: Define Type
        const wlWorkstations: WlWorkstationInterface[] = [];

        json.results.waitinglistworkstations[0].workplace.forEach(wp => {
            if (wp.hasOwnProperty('waitinglist')){
                wp.waitinglist.forEach(wl => {
                    const mappedWl: WlWorkstationInterface = {
                        workplaceId: wp.$.id,
                        period: wl.$.period,
                        order: wl.$.order,
                        firstbatch: wl.$.firstbatch,
                        lastbatch: wl.$.lastbatch,
                        articleId: wl.$.item,
                        amount: wl.$.amount,
                        timeneed: wl.$.timeneed,
                    };
                    wlWorkstations.push(mappedWl);
                });
            }
        });

        console.log(JSON.stringify(wlWorkstations));

        return wlWorkstations;
    }

    private extractInwards(json) {
        const inwards = [];

        json.results.futureinwardstockmovement[0].order.forEach(element => {
            inwards.push({
                orderperiod: element.$.orderperiod,
                id: element.$.id,
                mode: element.$.mode,
                articleId: element.$.article,
                amount: element.$.amount,
            });
        });

        return inwards;
    }
}
