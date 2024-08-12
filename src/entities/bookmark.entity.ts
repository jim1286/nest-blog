import { Column, Entity, ManyToOne } from 'typeorm';
import { PostEntity, UserEntity } from '.';
import { BaseEntity } from './base.entity';

@Entity('Bookmark')
export class BookmarkEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.bookmarks)
  user: UserEntity;

  @Column()
  userId: string;

  @ManyToOne(() => PostEntity, (post) => post.bookmarks)
  post: UserEntity;

  @Column()
  postId: string;
}
