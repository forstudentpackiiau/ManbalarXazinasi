import { Module } from '@nestjs/common';
import { KitoblarModule } from './modules/kitoblar/kitoblar.module';
import { DatabaseModule } from './common/base/database.providers'; // ✅ to'g'ri yo'l
import { KategoriyaModule } from './modules/kategoriya/kategoriya.module';
import { LoginModule } from './modules/login/login.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    DatabaseModule,
    KitoblarModule,
    KategoriyaModule,
    LoginModule,
  ],
})
export class KutubxonaBackendModule {}
