import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfig } from './config';
import { UserModule } from './user/user.module';
import { S3Module } from './s3/s3.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middlewares';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigModule],
      useClass: TypeOrmConfig,
    }),
    UserModule,
    S3Module,
    PostModule,
    AuthModule,
  ],
  providers: [Logger],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
