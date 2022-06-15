import { Injectable } from '@nestjs/common';
import { CapacityPlanningService } from 'src/capacity-planning/capacity-planning.service';
import { DirectSellService } from 'src/direct-sell/direct-sell.service';
import { DispositionField } from 'src/disposition-field/disposition-field.model';
import { DispositionService } from 'src/disposition/disposition.service';
import { ForecastService } from 'src/forecast/forecast.service';
import { PurchasePlanningService } from 'src/purchase-planning/purchase-planning.service';

@Injectable()
export class FileWriterService {
    constructor(
        private readonly purchaseService: PurchasePlanningService,
        private readonly dispoService: DispositionService,
        private readonly directSellService: DirectSellService,
        private readonly forecastService: ForecastService,
        private readonly capacityService: CapacityPlanningService,
    ) {}

    async write(period: number) {
        let xmlStr = '<input><qualitycontrol type="no" losequantity="0" delay="0"/>';
        xmlStr += await this.writeOrders(period);
        xmlStr += await this.writeProduction(period);

        console.log(xmlStr);
    }

    private async writeOrders(period: number) {
        const purchasePlanning = await this.purchaseService.findByPeriod(period);

        let xmlStr = '<orderslist>';
        for (const p of purchasePlanning[0].positions){
            if (p.orderAmount > 0) {
                let modus = p.orderType + 4;
                xmlStr += `<order article="${p.positionMaster.articleId}" quantity="${p.orderAmount}" modus="${modus}"/>`
            }
        }
        xmlStr += '</orderslist>'

        return xmlStr;
    }

    private async writeProduction(period: number) {
        let xmlStr = '<productionlist>';
        
        function writeChildren(child: DispositionField) {
            xmlStr += `<production article="${child.articleId}" quantity="${child.productionOrderCount}"/>`;
            if (child.childFields) {
                child.childFields.forEach(c => writeChildren(c));
            }
        }
        
        const dispos = await this.dispoService.findByPeriod(period);
        
        for (const d of dispos) {
            xmlStr += `<production article="${d.salesArticleId}" quantity="${d.productionOrderCount}"/>`;

            d.fields.forEach(c => writeChildren(c));
        }

        xmlStr += '</productionlist>';

        return xmlStr;

        //TODO: Duplikate entfernen, negative zu null
    }

    private async writeSellDirect(period) {
        const sells = await this.directSellService.findByPeriod(period);

        let xmlStr = '<selldirect>';

        for (const s of sells) {
            xmlStr += `<item article="${s.Produkt}" quantity="${s.Menge}" price="${s.Preis}" penalty="${s.Konventionalstrafe}"/>`
        }

        xmlStr += '</selldirect>'
    }

    private async writeSellwish(period) {
        const wishes = await this.forecastService.getByPeriod(period);
        const wish = wishes[0];

        let xmlStr = '<sellwish>';

        xmlStr += `<item article="1" quantity="${wish.firstP1}"/>
                   <item article="2" quantity="${wish.firstP2}"/>
                   <item article="3" quantity="${wish.firstP3}"/>`

        xmlStr += '</sellwish>';
    }

    private async writeWorkingtime(period) {
        const planning = await this.capacityService.getPlanning(period);

        let xmlStr = '<workingtimelist>';

        for (const w of planning.fields) {
            xmlStr += `<workingtime station="${w.workplace}" shift="${w.shifts}" overtime="${w.overtime}"/>`
        }

        xmlStr = '</workingtimelist>';
    }
}
