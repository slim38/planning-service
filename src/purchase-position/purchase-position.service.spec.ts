import { Test, TestingModule } from '@nestjs/testing';
import { PurchasePositionService } from './purchase-position.service';

describe('PurchasePositionService', () => {
  let service: PurchasePositionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchasePositionService],
    }).compile();

    service = module.get<PurchasePositionService>(PurchasePositionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
