import { Module } from '@nestjs/common';
import { KitoblarModule } from './modules/kitoblar/kitoblar.module';
import { databaseProviders } from './common/base/database.providers';
import { KategoriyaModule } from './modules/kategoriya/kategoriya.module';
import { LoginModule } from './modules/login/login.module';
import { join } from 'node:path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads'), // Static fayllar uchun yo‘l
    serveRoot: '/uploads', // URL orqali kirish yo‘li
  }), databaseProviders, KitoblarModule, KategoriyaModule, LoginModule],
})
export class KutubxonaBackendModule {}
