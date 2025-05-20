import { SequelizeModule } from "@nestjs/sequelize";
import { configration } from "../config/env";

function parseDatabaseUrl(databaseUrl: string) {
  // Example: postgres://user:pass@host:5432/dbname
  const match = databaseUrl.match(
    /^postgres:\/\/(.*?):(.*?)@(.*?):(\d+)\/(.*?)$/
  );
  if (!match) throw new Error("Invalid DATABASE_URL format");

  return {
    username: match[1],
    password: match[2],
    host: match[3],
    port: parseInt(match[4], 10),
    database: match[5],
  };
}

const isProduction = !!process.env.DATABASE_URL;

const dbConfig = isProduction
  ? {
      dialect: 'postgres' as const,
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
