import { PostValidate } from '@/dto';
import { PostEntity } from '@/entities';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class PostRepository extends Repository<PostEntity> {
  constructor(dataSource: DataSource) {
    super(PostEntity, dataSource.createEntityManager());
  }

  async getAllPostList() {
    const queryBuilder: SelectQueryBuilder<PostEntity> =
      this.createQueryBuilder('post');

    return await queryBuilder.orderBy('post.createdAt', 'DESC').getMany();
  }

  async getPostById(id: string) {
    const queryBuilder: SelectQueryBuilder<PostEntity> =
      this.createQueryBuilder('post');

    return await queryBuilder.where('post.id = :id', { id }).getOne();
  }

  async deletePostById(id: string) {
    const queryBuilder: SelectQueryBuilder<PostEntity> =
      this.createQueryBuilder('post');

    await queryBuilder.softDelete().where('post.id = :id', { id }).execute();
  }

  async updatePostById(body: PostValidate.UpdatePost, id: string) {
    const queryBuilder: SelectQueryBuilder<PostEntity> =
      this.createQueryBuilder('post');

    await queryBuilder
      .update(PostEntity)
      .set(body)
      .where('post.id = :id', { id })
      .execute();
  }
}
