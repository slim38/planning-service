import { Test, TestingModule } from '@nestjs/testing';
import { FutureInvardService } from './future-invard.service';

describe('FutureInvardService', () => {
  let service: FutureInvardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FutureInvardService],
    }).compile();

    service = module.get<FutureInvardService>(FutureInvardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
