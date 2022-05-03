import { Test, TestingModule } from '@nestjs/testing';
import { ProductionStepService } from './production-step.service';

describe('ProductionStepService', () => {
  let service: ProductionStepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductionStepService],
    }).compile();

    service = module.get<ProductionStepService>(ProductionStepService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
