import { Entity, ManyToOne } from 'typeorm';
import { PostEntity, UserEntity } from '.';
import { BaseEntity } from './base';

@Entity('Bookmark')
export class BookmarkEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.bookmarks)
  user: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.bookmarks)
  post: UserEntity;
}
