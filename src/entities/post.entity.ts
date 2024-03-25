import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
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

  @OneToOne(() => BookmarkEntity)
  @JoinColumn()
  bookmark: BookmarkEntity;

  @OneToOne(() => PostFavoriteEntity)
  @JoinColumn()
  postFavorite: PostFavoriteEntity;

  @OneToOne(() => CommentFavoriteEntity)
  @JoinColumn()
  commentFavorite: CommentFavoriteEntity;
}
