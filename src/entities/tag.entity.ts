import { Column, Entity, ManyToOne } from 'typeorm';
import { PostEntity } from '.';
import { BaseEntity } from './base';

@Entity('Tag')
export class TagEntity extends BaseEntity {
  @Column()
  content: string;

  @ManyToOne(() => PostEntity, (post) => post.tags)
  post: PostEntity;
}
