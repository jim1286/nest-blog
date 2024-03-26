import { JwtAuthGuard } from '@/guard';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from '@/dto';
import { GetUser } from '@/decorator';

@Controller('post')
@UseGuards(JwtAuthGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/')
  async createPost(
    @Body(ValidationPipe) body: PostDto.CreateDto,
    @GetUser('id') userId: string,
  ) {
    await this.postService.create(body, userId);
  }
}
