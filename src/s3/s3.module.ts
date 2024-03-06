import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { ConfigModule } from '@nestjs/config';
import { UtilModule } from '@/util/util.module';

@Module({
  imports: [ConfigModule, UtilModule],
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {}
