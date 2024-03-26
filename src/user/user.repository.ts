import { UserEntity } from '@/entities';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async findUserById(id: string): Promise<UserEntity> {
    const queryBuilder: SelectQueryBuilder<UserEntity> =
      this.createQueryBuilder('user');

    return await queryBuilder.where('user.id = :id', { id }).getOne();
  }

  async findUserByUsername(userName: string): Promise<UserEntity> {
    const queryBuilder: SelectQueryBuilder<UserEntity> =
      this.createQueryBuilder('user');

    return await queryBuilder
      .where('user.userName = :userName', { userName })
      .addSelect('user.password')
      .getOne();
  }
}
