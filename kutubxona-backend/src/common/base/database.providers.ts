import { SequelizeModule } from '@nestjs/sequelize';
import { configration } from '../config/env';

function parseDatabaseUrl(databaseUrl: string) {
  try {
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
  } catch (e) {
    throw new Error('Invalid DATABASE_URL format: ' + e.message);
  }
}

const isProduction = !!process.env.DATABASE_URL;

const dbConfig = isProduction
  ? {
      ...parseDatabaseUrl(process.env.DATABASE_URL!),
      synchronize: true,
      autoLoadModels: true,
    }
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

export const databaseProviders = SequelizeModule.forRoot(dbConfig);
