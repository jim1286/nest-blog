import { PostEntity } from '@/entities';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class PostRepository extends Repository<PostEntity> {
  constructor(dataSource: DataSource) {
    super(PostEntity, dataSource.createEntityManager());
  }

  async getPostListByUserId(userId: string) {
    const queryBuilder: SelectQueryBuilder<PostEntity> =
      this.createQueryBuilder('post');

    return await queryBuilder
      .leftJoinAndSelect('post.user', 'user')
      .where('user.id = :id', { id: userId })
      .getMany();
  }
}
