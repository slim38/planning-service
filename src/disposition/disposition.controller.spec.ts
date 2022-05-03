import { Test, TestingModule } from '@nestjs/testing';
import { DispositionController } from './disposition.controller';

describe('DispositionController', () => {
  let controller: DispositionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DispositionController],
    }).compile();

    controller = module.get<DispositionController>(DispositionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
