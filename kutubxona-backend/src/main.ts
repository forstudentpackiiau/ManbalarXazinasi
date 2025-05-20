import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { KutubxonaBackendModule } from './kutubxona.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './lib/allFilterException';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'node:path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { validate } from './lib/validate.env';
import {configration} from './common/config/env'
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(KutubxonaBackendModule);

  //filters
  const httpAdapter = app.get(HttpAdapterHost)
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapter))

  //validate.env
  validate()

  //swagger
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  //globalPipe
  app.useGlobalPipes(new ValidationPipe());
  
  //uploads
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });
  
  //acsess
  app.enableCors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PATCH,DELETE",
    allowedHeaders: "Content-Type,Authorization"
  });
  await app.listen(configration.PORT);
}
bootstrap();
