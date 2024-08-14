import { Logger, Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { UserRepository } from '@/modules/user/user.repository';

@Module({
  controllers: [PostController],
  providers: [PostService, PostRepository, UserRepository, Logger],
  exports: [PostService],
})
export class PostModule {}
