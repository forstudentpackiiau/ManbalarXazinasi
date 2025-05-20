import { Test, TestingModule } from '@nestjs/testing';
import { KategoriyaController } from './kategoriya.controller';
import { KategoriyaService } from './kategoriya.service';

describe('KategoriyaController', () => {
  let controller: KategoriyaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KategoriyaController],
      providers: [KategoriyaService],
    }).compile();

    controller = module.get<KategoriyaController>(KategoriyaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
