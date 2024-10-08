import { JwtAuthGuard } from '@/guards';
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
import { GetUser } from '@/decorators';
import {
  CreatePostRequestDto,
  MessageResponse,
  PostEntityResponse,
  UpdatePostRequestDto,
} from '@/http';

@Controller('post')
@UseGuards(JwtAuthGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/')
  async createPost(
    @Body(ValidationPipe) body: CreatePostRequestDto,
    @GetUser('id') userId: string,
  ): Promise<MessageResponse> {
    return await this.postService.createPost(body, userId);
  }

  @Get('/postList')
  async getPostList(
    @GetUser('id') userId: string,
  ): Promise<PostEntityResponse[]> {
    return await this.postService.getPostListByUserId(userId);
  }

  @Get('/postList/all')
  async getPostListAll(): Promise<PostEntityResponse[]> {
    return await this.postService.getPostListAll();
  }

  @Get('/:postId')
  async getPost(@Param('postId') postId: string): Promise<PostEntityResponse> {
    return await this.postService.getPostByPostId(postId);
  }

  @Delete('/:postId')
  async deletePost(
    @Param('postId') postId: string,
    @GetUser('id') userId: string,
  ): Promise<MessageResponse> {
    return await this.postService.deletePostByPostId(postId, userId);
  }

  @Put('/:postId')
  async updatePost(
    @Body(ValidationPipe) body: UpdatePostRequestDto,
    @Param('postId') postId: string,
    @GetUser('id') userId: string,
  ): Promise<MessageResponse> {
    return await this.postService.updatePostByPostId(body, postId, userId);
  }
}
