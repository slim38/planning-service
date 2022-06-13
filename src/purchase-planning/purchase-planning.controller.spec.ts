import { Test, TestingModule } from '@nestjs/testing';
import { PurchasePlanningController } from './purchase-planning.controller';

describe('PurchasePlanningController', () => {
  let controller: PurchasePlanningController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchasePlanningController],
    }).compile();

    controller = module.get<PurchasePlanningController>(PurchasePlanningController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
