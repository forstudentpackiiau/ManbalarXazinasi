import { Test, TestingModule } from '@nestjs/testing';
import { KategoriyaService } from './kategoriya.service';

describe('KategoriyaService', () => {
  let service: KategoriyaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KategoriyaService],
    }).compile();

    service = module.get<KategoriyaService>(KategoriyaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
