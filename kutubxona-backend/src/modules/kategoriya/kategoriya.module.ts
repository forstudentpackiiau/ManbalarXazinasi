import { Module } from '@nestjs/common';
import { KategoriyaService } from './kategoriya.service';
import { KategoriyaController } from './kategoriya.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Kategoriya } from './entities/kategoriya.entity';
import { KategoriyaRepository } from './kategoriya.repository';

@Module({
  imports:[SequelizeModule.forFeature([Kategoriya])],
  controllers: [KategoriyaController],
  providers: [
    {provide:"IKategoryaService", useClass:KategoriyaService},
    {provide:"IKategoryaRepository", useClass:KategoriyaRepository},
  ],
})
export class KategoriyaModule {}
