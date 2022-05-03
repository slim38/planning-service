import { Injectable } from '@nestjs/common';
import { ArticleInterface } from 'src/article/article.interface';
import { ArticleService } from 'src/article/article.service';
import { CapacityPlanning } from 'src/capacity-planning/capacity-planning.model';
import { CapacityPlanningService } from 'src/capacity-planning/capacity-planning.service';
import { DispositionService } from 'src/disposition/disposition.service';
import { OrdersInWorkInterface } from 'src/orders-in-work/orders-in-work.interface';
import { OrdersInWorkService } from 'src/orders-in-work/orders-in-work.service';
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
    ) {}

    async initNewPeriod(json: any){ //TODO: Define Type
        await this.updateDatabase(json);

        const period =  json.results.$.period;
        const forecastP1 = json.results.forecast[0].$.p1;
        const forecastP2 = json.results.forecast[0].$.p2;
        const forecastP3 = json.results.forecast[0].$.p3;

        const dispoP1 = await this.dispoService.initialize(period, 1, forecastP1);
        const dispoP2 = await this.dispoService.initialize(period, 2, forecastP2);
        const dispoP3 = await this.dispoService.initialize(period, 3, forecastP3);

        await this.capacityService.refresh(
            [
                dispoP1,
                dispoP2,
                dispoP3,
            ],
            period
        );

        return {
            P1: dispoP1,
            P2: dispoP2,
            P3: dispoP3
        };
    }

    private async updateDatabase(json: any){ //TODO: Define Type
        const articles: ArticleInterface[] = this.extractArticlesFromJson(json);
        const OIWs: OrdersInWorkInterface[] = this.extractOIWFromJson(json);
        const wlWorkstations: WlWorkstationInterface[] = this.extractWlWorkstationFromJson(json);

        await this.articleService.bulkCreate(articles);
        await this.oiwService.bulkCreate(OIWs);
        await this.wlService.bulkCreate(wlWorkstations);
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

        return wlWorkstations;
    }
}
