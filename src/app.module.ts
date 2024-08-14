import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfig } from './config';
import { UserModule } from './modules/user/user.module';
import { S3Module } from './modules/s3/s3.module';
import { PostModule } from './modules/post/post.module';
import { LoggerMiddleware } from './middlewares';
import { PostFavoriteModule } from './modules/post-favorite/post-favorite.module';
import { CommentModule } from './modules/comment/comment.module';
import { CommentFavoriteModule } from './modules/comment-favorite/comment-favorite.module';

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
    PostFavoriteModule,
    CommentModule,
    CommentFavoriteModule,
  ],
  providers: [Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
