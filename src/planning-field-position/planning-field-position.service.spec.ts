import { Test, TestingModule } from '@nestjs/testing';
import { PlanningFieldPositionService } from './planning-field-position.service';

describe('PlanningFieldPositionService', () => {
  let service: PlanningFieldPositionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanningFieldPositionService],
    }).compile();

    service = module.get<PlanningFieldPositionService>(PlanningFieldPositionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
