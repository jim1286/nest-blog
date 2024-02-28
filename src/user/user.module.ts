import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { TokenStrategy } from '../strategy/token.strategy';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config({ path: `.env.dev` });

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: process.env.Access_Secret,
      signOptions: {
        expiresIn: '10d',
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, TokenStrategy],
})
export class UserModule {}
