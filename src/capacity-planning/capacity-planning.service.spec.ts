import { Test, TestingModule } from '@nestjs/testing';
import { CapacityPlanningService } from './capacity-planning.service';

describe('CapacityPlanningService', () => {
  let service: CapacityPlanningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CapacityPlanningService],
    }).compile();

    service = module.get<CapacityPlanningService>(CapacityPlanningService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
