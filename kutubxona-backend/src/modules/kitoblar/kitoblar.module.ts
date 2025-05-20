import { Module } from '@nestjs/common';
import { KitoblarService } from './kitoblar.service';
import { KitoblarController } from './kitoblar.controller';
import { KitoblarRepository } from './kitoblar.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Kitoblar } from './entities/kitoblar.entity';

@Module({
  imports:[SequelizeModule.forFeature([Kitoblar])],
  controllers: [KitoblarController],
  providers: [
    {provide:"IKitoblarRepository", useClass:KitoblarRepository},
    {provide:"IKitoblarService", useClass:KitoblarService},
  ],
})
export class KitoblarModule {}
