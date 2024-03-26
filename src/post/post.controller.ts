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

  @Get('/postList/all')
  async getAllPostList(): Promise<PostEntity[]> {
    return await this.postService.getAllPostList();
  }

  @Get('/postList/:userId')
  async getPostListByUserId(
    @Param('userId') userId: string,
  ): Promise<PostEntity[]> {
    return await this.postService.getPostListByUserId(userId);
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
    @Body(ValidationPipe) body: PostDto.UpdatePostDto,
    @Param('postId') postId: string,
    @GetUser('id') userId: string,
  ) {
    return await this.postService.updatePostByPostId(body, postId, userId);
  }
}
