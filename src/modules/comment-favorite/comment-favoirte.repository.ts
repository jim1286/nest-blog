import { CommentFavoriteEntity } from '@/entities';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class CommentFavoriteRepository extends Repository<CommentFavoriteEntity> {
  constructor(dataSource: DataSource) {
    super(CommentFavoriteEntity, dataSource.createEntityManager());
  }

  async getCommentFavoriteByUserIdAndCommentId(
    userId: string,
    commentId: string,
  ) {
    const queryBuilder: SelectQueryBuilder<CommentFavoriteEntity> =
      this.createQueryBuilder('commentFavorite');

    return await queryBuilder
      .where('commentFavorite.userId = :userId', { userId })
      .andWhere('commentFavorite.commentId = :commentId', { commentId })
      .getOne();
  }

  async deleteCommentFavoriteByCommentId(commentId: string) {
    const queryBuilder: SelectQueryBuilder<CommentFavoriteEntity> =
      this.createQueryBuilder('commentFavorite');

    return await queryBuilder
      .softDelete()
      .where('commentFavorite.commentId = :commentId', { commentId })
      .execute();
  }

  async getCommentFavoriteListByUserId(userId: string) {
    const queryBuilder: SelectQueryBuilder<CommentFavoriteEntity> =
      this.createQueryBuilder('commentFavorite');

    return await queryBuilder
      .where('commentFavorite.userId = :userId', { userId })
      .getMany();
  }
}
