import { UserEntity } from '@/entities';
import { Injectable, NotFoundException } from '@nestjs/common';
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

    if (!user) {
      throw new NotFoundException(`user "${userName}" not found`);
    }

    return user;
  }
}
