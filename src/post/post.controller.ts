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
    return await this.postService.createPost(body, userName);
  }

  @Get('/')
  async getPostListByUserId(@GetUser('id') userId: string) {
    return await this.postService.getPostListByUserId(userId);
  }
}
