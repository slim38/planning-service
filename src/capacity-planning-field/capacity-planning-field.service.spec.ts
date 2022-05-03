import { Test, TestingModule } from '@nestjs/testing';
import { CapacityPlanningFieldService } from './capacity-planning-field.service';

describe('CapacityPlanningFieldService', () => {
  let service: CapacityPlanningFieldService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CapacityPlanningFieldService],
    }).compile();

    service = module.get<CapacityPlanningFieldService>(CapacityPlanningFieldService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
