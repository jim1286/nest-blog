import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './config';
import { UserModule } from './user/user.module';
import { S3Module } from './s3/s3.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    UserModule,
    S3Module,
    PostModule,
    AuthModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
