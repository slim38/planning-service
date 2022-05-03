import { Test, TestingModule } from '@nestjs/testing';
import { CapacityPlanningController } from './capacity-planning.controller';

describe('CapacityPlanningController', () => {
  let controller: CapacityPlanningController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CapacityPlanningController],
    }).compile();

    controller = module.get<CapacityPlanningController>(CapacityPlanningController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
