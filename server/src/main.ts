import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ConfigService } from '@nestjs/config';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
// import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './common/swagger';

async function bootstrap() {
  //
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.enableCors({
    credentials: true,
    origin: [configService.get('ORIGIN'), '*', 'all'],
    // optionsSuccessStatus: 200,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  });

  app.setGlobalPrefix('api');
  // app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  // app.use(helmet());
  app.use(compression());

  if (configService.get('NODE_ENV') === 'development') {
    setupSwagger(app);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(+configService.get('PORT'));

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
