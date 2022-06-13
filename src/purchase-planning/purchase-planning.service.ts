import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Article } from 'src/article/article.model';
import { PurchasePositionMasterModel } from 'src/purchase-position-master/purchase-position-master.model';
import { PurchasePositionMasterService } from 'src/purchase-position-master/purchase-position-master.service';
import { OrderType, PurchasePositionModel } from 'src/purchase-position/purchase-position.model';
import { PurchasePositionService } from 'src/purchase-position/purchase-position.service';
import { PurchasePlanningModel } from './purchase-planning.model';

@Injectable()
export class PurchasePlanningService {
    constructor(
        @InjectModel(PurchasePlanningModel)
        private model: typeof PurchasePlanningModel,
        private readonly masterService: PurchasePositionMasterService,
        private readonly positionService: PurchasePositionService,
    ) {}

    async initialize(period: number) {
        await this.deleteByPeriod(period);
        
        //get all position-masters
        const masters = await this.masterService.findAll();

        //get Forecast TODO: Forecast-Model
        const firstP1 = 350;
        const firstP2 = 350;
        const firstP3 = 350;

        const secondP1 = 350;
        const secondP2 = 350;
        const secondP3 = 350;
    
        const thirdP1 = 350;
        const thirdP2 = 350;
        const thirdP3 = 350;

        const fourthP1 = 350;
        const fourthP2 = 350;
        const fourthp3 = 350;

        //create position in db
        await this.model.create({
            period,
        });

        //create position-templates
        const positions = []
        for (const m of masters) {
            const firstDemand = m.prodOneDemand * firstP1 +
                                m.prodTwoDemand * firstP2 +
                                m.prodThreeDemand * firstP3;
            
            const secondDemand = m.prodOneDemand * secondP1 +
                                 m.prodTwoDemand * secondP2 +
                                 m.prodThreeDemand * secondP3;
            
            const thirdDemand = m.prodOneDemand * thirdP1 +
                                m.prodTwoDemand * thirdP2 +
                                m.prodThreeDemand * thirdP3;

            const fourthDemand = m.prodOneDemand * fourthP1 +
                                 m.prodTwoDemand * fourthP2 +
                                 m.prodThreeDemand * fourthp3;

            //Calculate order-data
            const orderPeriod = m.article.inwards[0]?.orderperiod;
            const orderArrival =  m.deliveryTime + m.deviation - (period - orderPeriod);
            const orderAmount = m.article.inwards[0]?.amount;
            
            let totalDemand = firstDemand + secondDemand + thirdDemand + fourthDemand;
            const stock = m.article.amount;
            if (stock >= totalDemand) {
                positions.push({
                    period,
                    firstDemand,
                    secondDemand,
                    thirdDemand,
                    fourthDemand,
                    orderAmount: 0,
                    orderType: null,
                    articleId: m.articleId
                });
                continue;
            }

            totalDemand -= fourthDemand;
            if (stock >= totalDemand) {
                let availableDays = 3 + (stock - totalDemand)/fourthDemand;
                if (orderArrival <= availableDays) {
                    availableDays += (orderAmount)/fourthDemand;
                }
                if ((availableDays - m.deliveryTime - m.deviation) >= 1) {
                    positions.push({
                        period,
                        firstDemand,
                        secondDemand,
                        thirdDemand,
                        fourthDemand,
                        orderAmount: 0,
                        orderType: null,
                        articleId: m.articleId
                    });
                    continue;
                }
                if (availableDays < (m.deliveryTime + m.deviation)) {
                    positions.push({
                        period,
                        firstDemand,
                        secondDemand,
                        thirdDemand,
                        fourthDemand,
                        orderAmount: m.discAmount,
                        orderType: OrderType.Eil,
                        articleId: m.articleId
                    });
                    continue;
                }
                positions.push({
                    period,
                    firstDemand,
                    secondDemand,
                    thirdDemand,
                    fourthDemand,
                    orderAmount: m.discAmount,
                    orderType: OrderType.Normal,
                    articleId: m.articleId
                });
                continue;
            }

            totalDemand -= thirdDemand;
            if (stock >= totalDemand) {
                let availableDays = 2 + (stock - totalDemand)/thirdDemand;
                if (orderArrival <= availableDays) {
                    availableDays += (orderAmount)/thirdDemand;
                }
                if ((availableDays - m.deliveryTime - m.deviation) >= 1) {
                    positions.push({
                        period,
                        firstDemand,
                        secondDemand,
                        thirdDemand,
                        fourthDemand,
                        orderAmount: 0,
                        orderType: null,
                        articleId: m.articleId
                    });
                    continue;
                }
                if (availableDays < (m.deliveryTime + m.deviation)) {
                    positions.push({
                        period,
                        firstDemand,
                        secondDemand,
                        thirdDemand,
                        fourthDemand,
                        orderAmount: m.discAmount,
                        orderType: OrderType.Eil,
                        articleId: m.articleId
                    });
                    continue;
                }
                positions.push({
                    period,
                    firstDemand,
                    secondDemand,
                    thirdDemand,
                    fourthDemand,
                    orderAmount: m.discAmount,
                    orderType: OrderType.Normal,
                    articleId: m.articleId
                });
                continue;
            }

            totalDemand -= secondDemand;
            if (stock >= totalDemand) {
                let availableDays = 1 + (stock - totalDemand)/secondDemand;
                if (orderArrival <= availableDays) {
                    availableDays += (orderAmount)/secondDemand;
                }
                if ((availableDays - m.deliveryTime - m.deviation) >= 1) {
                    positions.push({
                        period,
                        firstDemand,
                        secondDemand,
                        thirdDemand,
                        fourthDemand,
                        orderAmount: 0,
                        orderType: null,
                        articleId: m.articleId
                    });
                    continue;
                }
                if (availableDays < (m.deliveryTime + m.deviation)) {
                    positions.push({
                        period,
                        firstDemand,
                        secondDemand,
                        thirdDemand,
                        fourthDemand,
                        orderAmount: m.discAmount,
                        orderType: OrderType.Eil,
                        articleId: m.articleId
                    });
                    continue;
                }
                positions.push({
                    period,
                    firstDemand,
                    secondDemand,
                    thirdDemand,
                    fourthDemand,
                    orderAmount: m.discAmount,
                    orderType: OrderType.Normal,
                    articleId: m.articleId
                });
                continue;
            }

            totalDemand -= firstDemand;
            if (stock >= totalDemand) {
                let availableDays =  (stock - totalDemand)/firstDemand;
                if (orderArrival <= availableDays) {
                    availableDays += (orderAmount)/firstDemand;
                }
                if ((availableDays - m.deliveryTime - m.deviation) >= 1) {
                    positions.push({
                        period,
                        firstDemand,
                        secondDemand,
                        thirdDemand,
                        fourthDemand,
                        orderAmount: 0,
                        orderType: null,
                        articleId: m.articleId
                    });
                    continue;
                }
                if (availableDays < (m.deliveryTime + m.deviation)) {
                    positions.push({
                        period,
                        firstDemand,
                        secondDemand,
                        thirdDemand,
                        fourthDemand,
                        orderAmount: m.discAmount,
                        orderType: OrderType.Eil,
                        articleId: m.articleId
                    });
                    continue;
                }
                positions.push({
                    period,
                    firstDemand,
                    secondDemand,
                    thirdDemand,
                    fourthDemand,
                    orderAmount: m.discAmount,
                    orderType: OrderType.Normal,
                    articleId: m.articleId
                });
                continue;
            }
        }

        //create position-templates in db
        console.log('\n Positions:________'+JSON.stringify(positions));
        await this.positionService.bulkCreate(positions);

        //TODO: Vorherige Bestellung
    }

    async deleteByPeriod(period: number) {
        await this.model.destroy({
            where: {
                period,
            }
        });
    }

    async findByPeriod(period: number) {
        return await this.model.findAll({
            where: {
                period
            },
            include: [
                {
                    model: PurchasePositionModel,
                    include: [
                        { model: PurchasePositionMasterModel, include:[Article] }
                    ],
                }
            ]
        });
    }
}
