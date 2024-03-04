import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from '@/entities';
import { JwtStrategy } from '@/strategy/jwt.strategy';
import { TokenStrategy } from '@/strategy/token.strategy';
import { UtilModule } from '@/util/util.module';
import { S3Service } from '@/s3/s3.service';
import { UtilService } from '@/util/util.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('SECRET'),
          signOptions: { expiresIn: '10d' },
        };
      },
    }),
    UtilModule,
  ],
  controllers: [UserController],
  providers: [UserService, TokenStrategy, JwtStrategy, S3Service, UtilService],
})
export class UserModule {}
