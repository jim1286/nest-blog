import { Column, Entity, ManyToOne } from 'typeorm';
import { CommentEntity, UserEntity } from '.';
import { BaseEntity } from './base.entity';

@Entity('CommentFavorite')
export class CommentFavoriteEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.commentFavorites)
  user: UserEntity;

  @Column()
  userId: string;

  @ManyToOne(() => CommentEntity, (comment) => comment.commentFavorites)
  comment: CommentEntity;

  @Column()
  commentId: string;
}
