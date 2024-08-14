import { JwtAuthGuard } from '@/guards';
import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommentFavoriteService } from './comment-favorite.service';
import { GetUser } from '@/decorators';
import { CommentFavoriteEntityResponse, MessageResponse } from '@/http';

@Controller('comment-favorite')
@UseGuards(JwtAuthGuard)
export class CommentFavoriteController {
  constructor(
    private readonly commentFavoriteService: CommentFavoriteService,
  ) {}

  @Post('/:commentId')
  async updateCommentFavorite(
    @GetUser('id') userId: string,
    @Param('commentId') commentId: string,
  ): Promise<MessageResponse> {
    return await this.commentFavoriteService.updateCommentFavorite(
      userId,
      commentId,
    );
  }

  @Get('/')
  async getCommentFavoriteList(
    @GetUser('id') userId: string,
  ): Promise<CommentFavoriteEntityResponse[]> {
    return await this.commentFavoriteService.getCommentFavoriteListByUserId(
      userId,
    );
  }
}
