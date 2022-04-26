import { Test, TestingModule } from '@nestjs/testing';
import { OrdersInWorkService } from './orders-in-work.service';

describe('OrdersInWorkService', () => {
  let service: OrdersInWorkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersInWorkService],
    }).compile();

    service = module.get<OrdersInWorkService>(OrdersInWorkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
