import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy, TokenStrategy } from '@/strategy';
import { UserEntity } from '@/entities';

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
  ],
  controllers: [UserController],
  providers: [UserService, TokenStrategy, JwtStrategy],
})
export class UserModule {}
