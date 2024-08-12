import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CommentFavoriteEntity, PostEntity, UserEntity } from '.';
import { BaseEntity } from './base.entity';

@Entity('Comment')
export class CommentEntity extends BaseEntity {
  @Column()
  content: string;

  @Column()
  isDeleted: boolean;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  user: UserEntity;

  @Column()
  userId: string;

  @ManyToOne(() => PostEntity, (user) => user.comments)
  post: PostEntity;

  @Column()
  postId: string;

  @ManyToOne(() => CommentEntity, (comment) => comment.children)
  parent: CommentEntity;

  @Column()
  parentId: string;

  @OneToMany(() => CommentEntity, (comment) => comment.parent)
  children: CommentEntity[];

  @OneToMany(
    () => CommentFavoriteEntity,
    (commentFavorite) => commentFavorite.comment,
  )
  commentFavorites: CommentFavoriteEntity[];
}
