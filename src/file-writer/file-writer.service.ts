import { Injectable } from '@nestjs/common';
import { BatchService } from 'src/batch/batch.service';
import { CapacityPlanningService } from 'src/capacity-planning/capacity-planning.service';
import { DirectSellService } from 'src/direct-sell/direct-sell.service';
import { DispositionField } from 'src/disposition-field/disposition-field.model';
import { DispositionService } from 'src/disposition/disposition.service';
import { ForecastService } from 'src/forecast/forecast.service';
import { PurchasePlanningService } from 'src/purchase-planning/purchase-planning.service';
import { OrderType } from 'src/purchase-position/purchase-position.model';

@Injectable()
export class FileWriterService {
    constructor(
        private readonly purchaseService: PurchasePlanningService,
        private readonly dispoService: DispositionService,
        private readonly directSellService: DirectSellService,
        private readonly forecastService: ForecastService,
        private readonly capacityService: CapacityPlanningService,
        private readonly batchService: BatchService,
    ) {}

    async write(period: number, p1, p2, p3) {
        let xmlStr = '<input><qualitycontrol type="no" losequantity="0" delay="0"/>';
        
        xmlStr += await this.writeSellwish(period, p1, p2, p3);
        xmlStr += await this.writeSellDirect(period);
        xmlStr += await this.writeOrders(period);
        xmlStr += await this.writeProd(period);
        xmlStr += await this.writeWorkingtime(period);

        xmlStr += '</input>'

        console.log(xmlStr);

        return xmlStr;
    }

    private async writeOrders(period: number) {
        const purchasePlanning = await this.purchaseService.findByPeriod(period);

        let xmlStr = '<orderlist>';

        if (purchasePlanning[0]){
            for (const p of purchasePlanning[0].positions){
                if (p.orderAmount > 0) {
                    let modus = p.orderType === OrderType.Eil ? 4 : 5;
                    xmlStr += `<order article="${p.positionMaster.articleId}" quantity="${p.orderAmount}" modus="${modus}"/>`
                }
            }
        }
        xmlStr += '</orderlist>'

        return xmlStr;
    }

    private async writeProduction(period: number) {
        let xmlStr = '<productionlist>';
        
        function writeChildren(child: DispositionField, xmlArr) {
            if (child.productionOrderCount > 0) {
                xmlArr.push(`<production article="${child.articleId}" quantity="${child.productionOrderCount}"/>`);
            }
            
            if (child.childFields) {
                child.childFields.forEach(c => writeChildren(c, xmlArr));
            }
        }
        
        const dispos = await this.dispoService.findByPeriod(period);

        console.log(dispos);
        
        for (const d of dispos) {

            const xmlArr = [];

            if (d.productionOrderCount ) {
                xmlArr.push(`<production article="${d.salesArticleId}" quantity="${d.productionOrderCount}"/>`);
            }
            d.fields.forEach(c => writeChildren(c, xmlArr));

            for (let i = xmlArr.length - 1; i >= 0; i--){
                xmlStr += xmlArr[i];
            }
        }

        xmlStr += '</productionlist>';

        return xmlStr;

        //TODO: Duplikate entfernen, negative zu null
    }

    private async writeProd(period) {
        const batches = await this.batchService.getByPeriod(period);
        const batch = batches[0]
        console.log(batch.dispos);
        const xmlArr = [];
        const posArr = [];

        let i = 0;

        while (i < batch.dispos.length) {
            console.log(batch.dispos[i].amount1)
            if (batch.dispos[i].amount1 > 0) {
                posArr.push({
                    article: batch.dispos[i].article,
                    amount:  batch.dispos[i].amount1,
                    position: batch.dispos[i].position1
                });
            }

            if (batch.dispos[i].amount2 > 0) {
                posArr.push({
                    article: batch.dispos[i].article,
                    amount:  batch.dispos[i].amount2,
                    position: batch.dispos[i].position2
                });
            }

            i++;
        }
        let help;

        console.log(posArr);
        for (let j = 0; j < posArr.length; j++) {
            for (let i = j; i < posArr.length; i++) {
                if (posArr[i].position < posArr[j].position){
                    help = posArr[i];
                    posArr[i] = posArr[j];
                    posArr[j] = help;
                }
            }
            console.log('#'+posArr[j].position+' '+posArr[j].article);
        }

        let xmlStr = '<productionlist>';

        for (let i = 0; i<posArr.length; i++) {
            xmlStr += `<production article="${posArr[i].article}" quantity="${posArr[i].amount}"/>`
        }

        xmlStr += '</productionlist>';

        return xmlStr;
    }

    private async writeDispo(d) {
        const fields = [];

        function pushField(c) {
            if (c.productionOrderCount > 0) {
                fields.push(c);
            }

            c.childFields.forEach(c => pushField(c));
        }

        d.fields.forEach(f => pushField(f));

        for (let i = fields.length; i >= 0; i--) {}
    }

    private async writeSellDirect(period) {
        const sells = await this.directSellService.findByPeriod(period);

        let xmlStr = '<selldirect>';

        if (sells.length === 0) {
            xmlStr += `<item article="1" quantity="0" price="0" penalty="0"/>
            <item article="2" quantity="0" price="0" penalty="0"/>
            <item article="3" quantity="0" price="0" penalty="0"/>`
        }
        for (const s of sells) {
            xmlStr += `<item article="${s.Produkt}" quantity="${s.Menge}" price="${s.Preis}" penalty="${s.Konventionalstrafe}"/>`
        }

        xmlStr += '</selldirect>';

        return xmlStr;
    }

    private async writeSellwish(period, p1, p2, p3) {
        const wishes = await this.forecastService.getByPeriod(period);
        const wish = wishes[0];

        let xmlStr = '<sellwish>';

        if (wish) {
            xmlStr += `<item article="1" quantity="${p1}"/>
            <item article="2" quantity="${p2}"/>
            <item article="3" quantity="${p3}"/>`
        }
        
        xmlStr += '</sellwish>';

        return xmlStr;
    }

    private async writeWorkingtime(period) {
        const planning = await this.capacityService.getPlanning(period);

        let xmlStr = '<workingtimelist>';
        
        if (planning) {
            for (const w of planning.fields) {
                xmlStr += `<workingtime station="${w.workplace}" shift="${w.shifts}" overtime="${w.overtime}"/>`
            }
        }

        xmlStr += '</workingtimelist>';

        return xmlStr;
    }
}
