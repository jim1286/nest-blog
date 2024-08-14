import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { ConfigModule } from '@nestjs/config';
import { UtilStrategy } from '@/strategies';

@Module({
  imports: [ConfigModule],
  providers: [S3Service, UtilStrategy],
  exports: [S3Service],
})
export class S3Module {}
