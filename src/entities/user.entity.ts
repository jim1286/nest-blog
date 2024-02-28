import { Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity()
@Unique(['userName'])
export class UserEntity extends BaseEntity {
  @Column()
  userId: string;

  @Column()
  name: string;

  @Column()
  userName: string;

  @Column()
  password: string;
}
