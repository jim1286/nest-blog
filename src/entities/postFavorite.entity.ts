import { Column, Entity, ManyToOne } from 'typeorm';
import { PostEntity, UserEntity } from '.';
import { BaseEntity } from './base';

@Entity('PostFavorite')
export class PostFavoriteEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.postFavorites)
  user: UserEntity;

  @Column()
  userId: string;

  @ManyToOne(() => PostEntity, (post) => post.postFavorites)
  post: PostEntity;

  @Column()
  postId: string;
}
