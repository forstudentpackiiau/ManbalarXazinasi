import { Test, TestingModule } from '@nestjs/testing';
import { KitoblarService } from './kitoblar.service';

describe('KitoblarService', () => {
  let service: KitoblarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KitoblarService],
    }).compile();

    service = module.get<KitoblarService>(KitoblarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
