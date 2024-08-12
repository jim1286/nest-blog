import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import {
  BookmarkEntity,
  CommentEntity,
  PostFavoriteEntity,
  TagEntity,
  UserEntity,
} from '.';
import { BaseEntity } from './base.entity';

@Entity('Post')
export class PostEntity extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  subTitle: string;

  @Column()
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  user: UserEntity;

  @Column()
  userId: string;

  @OneToMany(() => TagEntity, (tag) => tag.post)
  tags: TagEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];

  @OneToMany(() => BookmarkEntity, (bookMark) => bookMark.post)
  bookmarks: BookmarkEntity[];

  @OneToMany(() => PostFavoriteEntity, (postFavorite) => postFavorite.post)
  postFavorites: PostFavoriteEntity[];
}
