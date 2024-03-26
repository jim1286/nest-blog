import { JwtAuthGuard } from '@/guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from '@/dto';
import { GetUser } from '@/decorator';
import { PostEntity } from '@/entities';

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
  async getPostList(@GetUser('id') userId: string): Promise<PostEntity[]> {
    return await this.postService.getPostList(userId);
  }

  @Delete('/:postId')
  async deletePost(
    @Param('postId') postId: string,
    @GetUser('id') userId: string,
  ) {
    return await this.postService.deletePost(postId, userId);
  }

  @Put('/:postId')
  async updatePost(
    @Body(ValidationPipe) body: PostDto.UpdatePostDto,
    @Param('postId') postId: string,
    @GetUser('id') userId: string,
  ) {
    return await this.postService.updatePost(body, postId, userId);
  }
}
