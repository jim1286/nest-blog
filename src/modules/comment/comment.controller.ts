import { JwtAuthGuard } from '@/guards';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import {
  CommentEntityResponse,
  CreateCommentRequestDto,
  MessageResponse,
} from '@/http';
import { GetUser } from '@/decorators';

@Controller('comment')
@UseGuards(JwtAuthGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/:postId')
  async createComment(
    @Body(ValidationPipe) body: CreateCommentRequestDto,
    @GetUser('id') userId: string,
    @Param('postId') postId: string,
  ): Promise<MessageResponse> {
    return await this.commentService.createComment(postId, userId, body);
  }

  @Post('/:postId/:commentId')
  async createReply(
    @Body(ValidationPipe) body: CreateCommentRequestDto,
    @GetUser('id') userId: string,
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
  ): Promise<MessageResponse> {
    return await this.commentService.createReply(
      postId,
      userId,
      commentId,
      body,
    );
  }

  @Get('/:postId')
  async getPostList(
    @Param('postId') postId: string,
  ): Promise<CommentEntityResponse[]> {
    return await this.commentService.getCommentListByPostId(postId);
  }

  @Delete('/:postId/:commentId')
  async deleteComment(
    @GetUser('id') userId: string,
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
  ): Promise<MessageResponse> {
    return await this.commentService.deleteComment(userId, postId, commentId);
  }

  @Delete('/:postId/:commentId/:replyId')
  async deleteReply(
    @GetUser('id') userId: string,
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
    @Param('replyId') replyId: string,
  ): Promise<MessageResponse> {
    return await this.commentService.deleteReply(
      userId,
      postId,
      commentId,
      replyId,
    );
  }
}
