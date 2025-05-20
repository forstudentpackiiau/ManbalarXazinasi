import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { configration } from '../config/env';

function parseDatabaseUrl(databaseUrl: string) {
  const url = new URL(databaseUrl);
  return {
    username: url.username,
    password: url.password,
    host: url.hostname,
    port: parseInt(url.port, 10),
    database: url.pathname.replace(/^\//, ''),
    dialect: 'postgres' as const,
    synchronize: true,
    autoLoadModels: true,
    dialectOptions: url.search
      ? { ssl: { require: true, rejectUnauthorized: false } }
      : {},
  };
}

const isProduction = !!process.env.DATABASE_URL;

const dbConfig = isProduction
  ? parseDatabaseUrl(process.env.DATABASE_URL!)
  : {
      dialect: 'postgres' as const,
      host: configration.POSTGRES_HOST,
      port: configration.POSTGRES_PORT,
      username: configration.POSTGRES_USER,
      password: configration.POSTGRES_PASSWORD,
      database: configration.POSTGRES_DB,
      synchronize: true,
      autoLoadModels: true,
    };

@Module({
  imports: [SequelizeModule.forRoot(dbConfig)],
})
export class DatabaseModule {}
