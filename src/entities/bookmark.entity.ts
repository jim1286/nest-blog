import { Entity, ManyToOne, OneToOne } from 'typeorm';
import { PostEntity, UserEntity } from '.';
import { BaseEntity } from './base';

@Entity('Bookmark')
export class BookmarkEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.bookmarks)
  user: UserEntity;

  @OneToOne(() => PostEntity, (post) => post.bookmark)
  post: PostEntity;
}
