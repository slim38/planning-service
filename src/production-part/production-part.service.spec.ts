import { Test, TestingModule } from '@nestjs/testing';
import { ProductionPartService } from './production-part.service';

describe('ProductionPartService', () => {
  let service: ProductionPartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductionPartService],
    }).compile();

    service = module.get<ProductionPartService>(ProductionPartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
