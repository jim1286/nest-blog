import { Entity, ManyToOne } from 'typeorm';
import { UserEntity } from '.';
import { BaseEntity } from './base';

@Entity('Bookmark')
export class BookmarkEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.bookmarks)
  user: UserEntity;
}
