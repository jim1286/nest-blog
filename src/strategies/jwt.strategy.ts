import { TokenPayload } from '@/interfaces';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '@/modules/user/user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('ACCESS_SECRET'), // 또는 다른 비밀 키 환경 변수
    });
  }

  async getAccessToken(payload: TokenPayload): Promise<string> {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('ACCESS_SECRET'),
      expiresIn: '10d',
    });
  }

  async getRefreshToken(payload: TokenPayload): Promise<string> {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('REFRESH_SECRET'),
      expiresIn: '10d',
    });
  }

  async validate(payload: TokenPayload) {
    const user = await this.userRepository.getUserByUserId(payload.id);

    if (!user) {
      throw new UnauthorizedException('유저가 존재하지 않습니다.');
    }

    return { id: payload.id, username: payload.userName };
  }
}
