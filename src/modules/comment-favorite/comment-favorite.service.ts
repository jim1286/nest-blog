import { Injectable } from '@nestjs/common';
import { CommentFavoriteRepository } from './comment-favoirte.repository';
import { CommentFavoriteEntityResponse, MessageResponse } from '@/http';
import { UserService } from '../user/user.service';
import { CommentService } from '../comment/comment.service';

@Injectable()
export class CommentFavoriteService {
  constructor(
    private readonly userService: UserService,
    private readonly commentService: CommentService,
    private readonly commentFavoriteRepository: CommentFavoriteRepository,
  ) {}

  async updateCommentFavorite(
    userId: string,
    commentId: string,
  ): Promise<MessageResponse> {
    const commentFavorite =
      await this.commentFavoriteRepository.getCommentFavoriteByUserIdAndCommentId(
        userId,
        commentId,
      );

    if (commentFavorite) {
      try {
        await this.commentFavoriteRepository.deleteCommentFavoriteByCommentId(
          commentId,
        );
        return { message: '댓글 좋아요 삭제 성공' };
      } catch (error) {
        throw new Error('댓글 좋아요 삭제 실패');
      }
    }

    const user = await this.userService.getUserByUserId(userId);
    const comment = await this.commentService.getCommentByCommentId(commentId);

    const newCommentFavorite = this.commentFavoriteRepository.create({
      user,
      comment,
    });

    try {
      await this.commentFavoriteRepository.save(newCommentFavorite);
      return { message: '댓글 좋아요 생성 성공' };
    } catch (error) {
      throw new Error('댓글 좋아요 생성 실패');
    }
  }

  async getCommentFavoriteListByUserId(
    userId: string,
  ): Promise<CommentFavoriteEntityResponse[]> {
    return await this.commentFavoriteRepository.getCommentFavoriteListByUserId(
      userId,
    );
  }
}
