import { PostEntity } from '@/entities';
import { UpdatePostRequestDto } from '@/http';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class PostRepository extends Repository<PostEntity> {
  constructor(dataSource: DataSource) {
    super(PostEntity, dataSource.createEntityManager());
  }

  async getPostListAll() {
    const queryBuilder: SelectQueryBuilder<PostEntity> =
      this.createQueryBuilder('post');

    return await queryBuilder.orderBy('post.createdAt', 'DESC').getMany();
  }

  async getPostByPostId(postId: string) {
    const queryBuilder: SelectQueryBuilder<PostEntity> =
      this.createQueryBuilder('post');

    return await queryBuilder.where('post.id = :postId', { postId }).getOne();
  }

  async deletePostByPostId(postId: string) {
    const queryBuilder: SelectQueryBuilder<PostEntity> =
      this.createQueryBuilder('post');

    await queryBuilder
      .softDelete()
      .where('post.id = :postId', { postId })
      .execute();
  }

  async getPostListByUserId(userId: string) {
    const queryBuilder: SelectQueryBuilder<PostEntity> =
      this.createQueryBuilder('post');

    return await queryBuilder
      .where('post.userId = :userId', { userId })
      .getMany();
  }

  async updatePostByPostId(body: UpdatePostRequestDto, postId: string) {
    const queryBuilder: SelectQueryBuilder<PostEntity> =
      this.createQueryBuilder('post');

    await queryBuilder
      .update(PostEntity)
      .set(body)
      .where('post.id = :postId', { postId })
      .execute();
  }
}
