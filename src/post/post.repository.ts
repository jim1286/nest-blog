import { PostDto } from '@/dto';
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

  async getPostByPostId(postId: string) {
    const queryBuilder: SelectQueryBuilder<PostEntity> =
      this.createQueryBuilder('post');

    return await queryBuilder.where('post.id = :id', { id: postId }).getOne();
  }

  async deletePostByPostId(postId: string) {
    const queryBuilder: SelectQueryBuilder<PostEntity> =
      this.createQueryBuilder('post');

    await queryBuilder
      .softDelete()
      .where('post.id = :id', { id: postId })
      .execute();
  }

  async updatePostByPostId(body: PostDto.UpdatePostDto, postId: string) {
    const queryBuilder: SelectQueryBuilder<PostEntity> =
      this.createQueryBuilder('post');

    await queryBuilder
      .update(PostEntity)
      .set(body)
      .where('post.id = :id', { id: postId })
      .execute();
  }
}
