import { Test, TestingModule } from '@nestjs/testing';
import { DispositionFieldService } from './disposition-field.service';

describe('DispositionFieldService', () => {
  let service: DispositionFieldService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DispositionFieldService],
    }).compile();

    service = module.get<DispositionFieldService>(DispositionFieldService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
