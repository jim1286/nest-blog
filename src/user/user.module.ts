import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '@/entities';
import { TokenStrategy } from '@/strategy';
import { S3Module } from '@/s3/s3.module';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    S3Module,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('SECRET'),
          signOptions: { expiresIn: '10d' },
        };
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, TokenStrategy],
  exports: [UserRepository],
})
export class UserModule {}
