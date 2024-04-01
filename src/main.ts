import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonLoggerConfig } from './config';
import * as dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonLoggerConfig,
  });
  await app.listen(process.env.SERVER_PORT);

  console.log(`=================================`);
  console.log(`=========== ENV : ${process.env.NODE_ENV} ===========`);
  console.log(`🚀 App listening on the port ${process.env.SERVER_PORT}`);
  console.log(`=================================`);
}

bootstrap();
