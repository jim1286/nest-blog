import { PostFavoriteEntity } from '@/entities';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class PostFavoriteRepository extends Repository<PostFavoriteEntity> {
  constructor(dataSource: DataSource) {
    super(PostFavoriteEntity, dataSource.createEntityManager());
  }

  async getListByUserId(userId: string) {
    const queryBuilder: SelectQueryBuilder<PostFavoriteEntity> =
      this.createQueryBuilder('postFavorite');

    return await queryBuilder
      .where('postFavorite.userId = :userId', {
        userId,
      })
      .getMany();
  }

  async getByUserIdAndPostId(userId: string, postId: string) {
    const queryBuilder: SelectQueryBuilder<PostFavoriteEntity> =
      this.createQueryBuilder('postFavorite');

    return await queryBuilder
      .where('postFavorite.userId = :userId', {
        userId,
      })
      .andWhere('postFavorite.postId = :postId', { postId })
      .getOne();
  }

  async deleteById(id: string) {
    const queryBuilder: SelectQueryBuilder<PostFavoriteEntity> =
      this.createQueryBuilder('postFavorite');

    return await queryBuilder
      .softDelete()
      .where('postFavorite.id = :id', {
        id,
      })
      .execute();
  }
}
