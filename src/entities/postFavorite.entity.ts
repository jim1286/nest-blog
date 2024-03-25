import { Entity, ManyToOne } from 'typeorm';
import { UserEntity } from '.';
import { BaseEntity } from './base';

@Entity('PostFavorite')
export class PostFavoriteEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.postFavorites)
  user: UserEntity;
}
