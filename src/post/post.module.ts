import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { UtilStrategy } from '@/strategy';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [PostController],
  providers: [PostService, PostRepository, UtilStrategy],
  exports: [PostRepository],
})
export class PostModule {}
