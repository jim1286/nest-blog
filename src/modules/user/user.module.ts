import { Logger, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '@/entities';
import { UserRepository } from './user.repository';
import { PassportModule } from '@nestjs/passport';
import { S3Module } from '../s3/s3.module';
import { JwtStrategy } from '@/strategies';

@Module({
  imports: [
    S3Module,
    PassportModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('ACCESS_SECRET'),
          signOptions: { expiresIn: '10d' },
        };
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, JwtStrategy, Logger],
  exports: [UserService],
})
export class UserModule {}
