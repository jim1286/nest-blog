import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { PostEntity, UserEntity } from '.';
import { BaseEntity } from './base';

@Entity('Comment')
export class CommentEntity extends BaseEntity {
  @Column()
  content: string;

  @Column()
  isDeleted: boolean;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  user: UserEntity;

  @ManyToOne(() => PostEntity, (user) => user.comments)
  post: PostEntity;

  @ManyToOne(() => CommentEntity, (comment) => comment.children)
  parent: CommentEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.parent)
  children: CommentEntity[];
}
