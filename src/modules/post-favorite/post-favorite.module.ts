import { Module } from '@nestjs/common';
import { PostFavoriteService } from './post-favorite.service';
import { PostFavoriteController } from './post-favorite.controller';
import { PostFavoriteRepository } from './post-favorite.repository';
import { UserModule } from '../user/user.module';
import { PostModule } from '../post/post.module';

@Module({
  imports: [UserModule, PostModule],
  providers: [PostFavoriteService, PostFavoriteRepository],
  controllers: [PostFavoriteController],
})
export class PostFavoriteModule {}
