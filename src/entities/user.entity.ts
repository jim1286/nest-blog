import { BaseEntity } from '@/base';
import { RoleEnum } from '@/enum';
import { Column, Entity, Unique } from 'typeorm';

@Entity('User')
@Unique(['userName'])
export class UserEntity extends BaseEntity {
  @Column()
  userName: string;

  @Column()
  password: string;

  @Column()
  role: RoleEnum;
}
