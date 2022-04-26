import { Test, TestingModule } from '@nestjs/testing';
import { PurchasingPartService } from './purchasing-part.service';

describe('PurchasingPartService', () => {
  let service: PurchasingPartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchasingPartService],
    }).compile();

    service = module.get<PurchasingPartService>(PurchasingPartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
