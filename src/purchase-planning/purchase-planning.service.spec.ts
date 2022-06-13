import { Test, TestingModule } from '@nestjs/testing';
import { PurchasePlanningService } from './purchase-planning.service';

describe('PurchasePlanningService', () => {
  let service: PurchasePlanningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchasePlanningService],
    }).compile();

    service = module.get<PurchasePlanningService>(PurchasePlanningService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
