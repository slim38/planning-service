import { Test, TestingModule } from '@nestjs/testing';
import { WlWorkstationService } from './wl-workstation.service';

describe('WlWorkstationService', () => {
  let service: WlWorkstationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WlWorkstationService],
    }).compile();

    service = module.get<WlWorkstationService>(WlWorkstationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
