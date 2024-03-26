import { UserEntity } from '@/entities';
import { User } from '@/interface';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async findUserByUsername(userName: string): Promise<UserEntity> {
    const queryBuilder: SelectQueryBuilder<UserEntity> =
      this.createQueryBuilder('user');

    const user = await queryBuilder
      .where('user.userName = :userName', { userName })
      .getOne();

    return user;
  }

  async saveUser(user: User) {
    const queryBuilder: SelectQueryBuilder<UserEntity> =
      this.createQueryBuilder('user');

    queryBuilder.insert().into(UserEntity).values(user).execute();
  }
}
