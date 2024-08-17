import { JwtAuthGuard } from '@/guards';
import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PostFavoriteService } from './post-favorite.service';
import { GetUser } from '@/decorators';
import { MessageResponse, PostFavoriteEntityResponse } from '@/http';

@Controller('post-favorite')
@UseGuards(JwtAuthGuard)
export class PostFavoriteController {
  constructor(private readonly postFavoriteService: PostFavoriteService) {}

  @Post('/:postId')
  async updateFavorite(
    @GetUser('id') userId: string,
    @Param('postId') postId: string,
  ): Promise<MessageResponse> {
    return await this.postFavoriteService.updateFavorite(userId, postId);
  }

  @Get('/:postId')
  async getFavorite(
    @GetUser('id') userId: string,
    @Param('postId') postId: string,
  ): Promise<PostFavoriteEntityResponse> {
    return await this.postFavoriteService.getFavoriteByUserIdAndPostId(
      userId,
      postId,
    );
  }

  @Get()
  async getFavoriteList(
    @GetUser('id') userId: string,
  ): Promise<PostFavoriteEntityResponse[]> {
    return await this.postFavoriteService.getFavoriteListByUserId(userId);
  }
}
