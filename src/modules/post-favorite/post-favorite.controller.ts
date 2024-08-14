import { JwtAuthGuard } from '@/guards';
import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PostFavoriteService } from './post-favorite.service';
import { GetUser } from '@/decorators';

@Controller('post-favorite')
@UseGuards(JwtAuthGuard)
export class PostFavoriteController {
  constructor(private readonly postFavoriteService: PostFavoriteService) {}

  @Post('/:postId')
  async updateFavorite(
    @GetUser('id') userId: string,
    @Param('postId') postId: string,
  ) {
    return await this.postFavoriteService.updateFavorite(userId, postId);
  }

  @Get('/:postId')
  async getFavorite(
    @GetUser('id') userId: string,
    @Param('postId') postId: string,
  ) {
    return await this.postFavoriteService.getFavorite(userId, postId);
  }

  @Get()
  async getFavoriteList(@GetUser('id') userId: string) {
    return await this.postFavoriteService.getFavoriteList(userId);
  }
}
