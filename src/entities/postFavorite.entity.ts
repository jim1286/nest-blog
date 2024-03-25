import { Entity, ManyToOne, OneToOne } from 'typeorm';
import { PostEntity, UserEntity } from '.';
import { BaseEntity } from './base';

@Entity('PostFavorite')
export class PostFavoriteEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.postFavorites)
  user: UserEntity;

  @OneToOne(() => PostEntity, (post) => post.postFavorite)
  post: PostEntity;
}
