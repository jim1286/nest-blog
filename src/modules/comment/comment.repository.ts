import { CommentEntity } from '@/entities';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class CommentRepository extends Repository<CommentEntity> {
  constructor(dataSource: DataSource) {
    super(CommentEntity, dataSource.createEntityManager());
  }

  async getCommentListWithReplyByPostId(postId: string) {
    const queryBuilder: SelectQueryBuilder<CommentEntity> =
      this.createQueryBuilder('comment');

    return await queryBuilder
      .leftJoinAndSelect('comment.children', 'children')
      .where('comment.postId = :postId', { postId })
      .orderBy('comment.createdAt', 'DESC')
      .getMany();
  }

  async getCommentWithReplyByCommentId(commentId: string) {
    const queryBuilder: SelectQueryBuilder<CommentEntity> =
      this.createQueryBuilder('comment');

    return await queryBuilder
      .where('comment.id = :commentId', { commentId })
      .getOne();
  }

  async getCommentWithReplyByCommentIdAndPostId(
    postId: string,
    commentId: string,
  ) {
    const queryBuilder: SelectQueryBuilder<CommentEntity> =
      this.createQueryBuilder('comment');

    return await queryBuilder
      .leftJoinAndSelect('comment.children', 'children')
      .where('comment.id = :postId', { postId })
      .andWhere('comment.postId = :commentId', { commentId })
      .getOne();
  }

  async deleteCommentByCommentId(commentId: string) {
    const queryBuilder: SelectQueryBuilder<CommentEntity> =
      this.createQueryBuilder('comment');

    return await queryBuilder
      .softDelete()
      .where('comment.id = :commentId', { commentId })
      .execute();
  }

  async deleteReplyByReplyId(replyId: string) {
    const queryBuilder: SelectQueryBuilder<CommentEntity> =
      this.createQueryBuilder('comment');

    return await queryBuilder
      .softDelete()
      .where('comment.id = :replyId', { replyId })
      .execute();
  }
}
