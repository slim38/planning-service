import { Test, TestingModule } from '@nestjs/testing';
import { DispositionService } from './disposition.service';

describe('DispositionService', () => {
  let service: DispositionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DispositionService],
    }).compile();

    service = module.get<DispositionService>(DispositionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
