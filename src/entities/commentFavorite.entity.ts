import { Entity, ManyToOne, OneToOne } from 'typeorm';
import { PostEntity, UserEntity } from '.';
import { BaseEntity } from './base';

@Entity('CommentFavorite')
export class CommentFavoriteEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.commentFavorite)
  user: UserEntity;

  @OneToOne(() => PostEntity, (post) => post.postFavorite)
  post: PostEntity;
}
