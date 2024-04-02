import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonLoggerConfig } from './config';
import * as dotenv from 'dotenv';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { HttpExceptionFilter } from './filter';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonLoggerConfig,
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(process.env.SERVER_PORT);

  console.log(`=================================`);
  console.log(`=========== ENV : ${process.env.NODE_ENV} ===========`);
  console.log(`🚀 App listening on the port ${process.env.SERVER_PORT}`);
  console.log(`=================================`);
}

bootstrap();
