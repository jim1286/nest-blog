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
import { PostValidate } from '@/dto';
import { GetUser } from '@/decorator';
import { PostEntity } from '@/entities';

@Controller('post')
@UseGuards(JwtAuthGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/')
  async createPost(
    @Body(ValidationPipe) body: PostValidate.CreatePost,
    @GetUser('id') userId: string,
  ) {
    return await this.postService.createPost(body, userId);
  }

  @Get('/postList')
  async getPostListByUserId(
    @GetUser('id') userId: string,
  ): Promise<PostEntity[]> {
    return await this.postService.getPostListByUserId(userId);
  }

  @Get('/postList/all')
  async getAllPostList(): Promise<PostEntity[]> {
    return await this.postService.getAllPostList();
  }

  @Get('/:postId')
  async getPostByPostId(@Param('postId') postId: string): Promise<PostEntity> {
    return await this.postService.getPostByPostId(postId);
  }

  @Delete('/:postId')
  async deletePostByPostId(
    @Param('postId') postId: string,
    @GetUser('id') userId: string,
  ) {
    return await this.postService.deletePostByPostId(postId, userId);
  }

  @Put('/:postId')
  async updatePostByPostId(
    @Body(ValidationPipe) body: PostValidate.UpdatePost,
    @Param('postId') postId: string,
    @GetUser('id') userId: string,
  ) {
    return await this.postService.updatePostByPostId(body, postId, userId);
  }
}
