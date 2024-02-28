import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  console.log(`=================================`);
  console.log(`=========== ENV : ${process.env.NODE_ENV} ===========`);
  console.log(`🚀 App listening on the port ${process.env.SERVER_PORT}`);
  console.log(`=================================`);
}

bootstrap();
