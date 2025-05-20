import { Test, TestingModule } from '@nestjs/testing';
import { KitoblarController } from './kitoblar.controller';
import { KitoblarService } from './kitoblar.service';

describe('KitoblarController', () => {
  let controller: KitoblarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KitoblarController],
      providers: [KitoblarService],
    }).compile();

    controller = module.get<KitoblarController>(KitoblarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
