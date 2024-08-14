import { Module } from '@nestjs/common';
import { CommentFavoriteController } from './comment-favorite.controller';
import { CommentFavoriteService } from './comment-favorite.service';
import { CommentFavoriteRepository } from './comment-favoirte.repository';
import { UserModule } from '../user/user.module';
import { CommentModule } from '../comment/comment.module';

@Module({
  imports: [UserModule, CommentModule],
  controllers: [CommentFavoriteController],
  providers: [CommentFavoriteService, CommentFavoriteRepository],
})
export class CommentFavoriteModule {}
