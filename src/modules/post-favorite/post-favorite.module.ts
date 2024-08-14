import { Module } from '@nestjs/common';
import { PostFavoriteService } from './post-favorite.service';
import { PostFavoriteController } from './post-favorite.controller';
import { PostFavoriteRepository } from './post-favorite.repository';
import { UserRepository } from '@/modules/user/user.repository';
import { PostRepository } from '@/modules/post/post.repository';

@Module({
  providers: [
    PostFavoriteService,
    PostFavoriteRepository,
    UserRepository,
    PostRepository,
  ],
  controllers: [PostFavoriteController],
})
export class PostFavoriteModule {}
