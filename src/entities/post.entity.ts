import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import {
  BookmarkEntity,
  CommentEntity,
  CommentFavoriteEntity,
  PostFavoriteEntity,
  TagEntity,
  UserEntity,
} from '.';
import { BaseEntity } from './base';

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

  @OneToMany(() => TagEntity, (tag) => tag.post)
  tags: TagEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];

  @OneToOne(() => BookmarkEntity, (bookmark) => bookmark.post)
  bookmark: BookmarkEntity;

  @OneToOne(() => PostFavoriteEntity, (postFavorite) => postFavorite.post)
  postFavorite: PostFavoriteEntity;

  @OneToOne(
    () => CommentFavoriteEntity,
    (commentFavorite) => commentFavorite.post,
  )
  commentFavorite: CommentFavoriteEntity;
}
