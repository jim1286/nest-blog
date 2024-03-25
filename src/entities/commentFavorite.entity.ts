import { Entity, ManyToOne } from 'typeorm';
import { UserEntity } from '.';
import { BaseEntity } from './base';

@Entity('CommentFavorite')
export class CommentFavoriteEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.commentFavorite)
  user: UserEntity;
}
