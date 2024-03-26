import { JwtAuthGuard } from '@/guard';
import {
  Body,
  Controller,
  Get,
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
    @GetUser('userName') userName: string,
  ) {
    await this.postService.createPost(body, userName);
  }

  @Get('/')
  async getPostListByUserId(@GetUser('id') userId: string) {
    await this.postService.getPostListByUserId(userId);
  }
}
