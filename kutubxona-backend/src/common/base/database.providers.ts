import { SequelizeModule } from "@nestjs/sequelize";
import { configration } from "../config/env";


export const databaseProviders = 
    SequelizeModule.forRoot({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: configration.POSTGRES_PASSWORD,
        database: 'kutubxona',
        synchronize:true,
        autoLoadModels:true,
      })

