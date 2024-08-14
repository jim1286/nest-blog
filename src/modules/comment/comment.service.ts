import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import {
  CommentEntityResponse,
  CreateCommentRequestDto,
  MessageResponse,
} from '@/http';
import { PostService } from '../post/post.service';
import { UserService } from '../user/user.service';

@Injectable()
export class CommentService {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
    private readonly commentRepository: CommentRepository,
  ) {}

  async createComment(
    postId: string,
    userId: string,
    body: CreateCommentRequestDto,
  ) {
    const post = await this.postService.getPostByPostId(postId);
    const user = await this.userService.getUserByUserId(userId);
    const newComment = this.commentRepository.create({
      post,
      user,
      parent: null,
      parentId: null,
      ...body,
    });

    try {
      await this.commentRepository.save(newComment);
      return { message: '댓글 생성 완료' };
    } catch (error) {
      throw new Error('댓글 생성 실패');
    }
  }

  async createReply(
    postId: string,
    userId: string,
    commentId: string,
    body: CreateCommentRequestDto,
  ) {
    const post = await this.postService.getPostByPostId(postId);
    const user = await this.userService.getUserByUserId(userId);
    const comment =
      await this.commentRepository.getCommentWithReplyByCommentIdAndPostId(
        postId,
        commentId,
      );

    if (!comment) {
      throw new NotFoundException('댓글이 존재하지 않습니다.');
    }

    const newComment = this.commentRepository.create({
      post,
      user,
      parent: comment,
      ...body,
    });

    try {
      await this.commentRepository.save(newComment);
      return { message: '대댓글 생성 완료' };
    } catch (error) {
      throw new Error('대댓글 생성 실패');
    }
  }

  async getCommentListByPostId(
    postId: string,
  ): Promise<CommentEntityResponse[]> {
    return (
      await this.commentRepository.getCommentListWithReplyByPostId(postId)
    ).filter((comment) => !comment.parentId);
  }

  async deleteComment(
    userId: string,
    postId: string,
    commentId: string,
  ): Promise<MessageResponse> {
    const comment =
      await this.commentRepository.getCommentWithReplyByCommentIdAndPostId(
        postId,
        commentId,
      );

    if (userId !== comment.userId) {
      throw new UnauthorizedException('작성자만 댓글을 삭제할 수 있습니다.');
    }

    try {
      await this.commentRepository.deleteCommentByCommentId(commentId);
      return { message: '댓글 삭제 완료' };
    } catch (error) {
      throw new NotFoundException('댓글 삭제 실패');
    }
  }

  async deleteReply(
    userId: string,
    postId: string,
    commentId: string,
    replyId: string,
  ): Promise<MessageResponse> {
    const comment =
      await this.commentRepository.getCommentWithReplyByCommentIdAndPostId(
        postId,
        commentId,
      );

    const findReply = comment.children.find((reply) => reply.id === replyId);

    if (!findReply) {
      throw new NotFoundException('대댓글이 존재하지 않습니다.');
    }

    if (userId !== findReply.userId) {
      throw new UnauthorizedException('작성자만 대댓글을 삭제할 수 있습니다.');
    }

    try {
      await this.commentRepository.deleteReplyByReplyId(replyId);
      return { message: '대댓글 삭제 완료' };
    } catch (error) {
      throw new NotFoundException('대댓글 삭제 실패');
    }
  }
}
