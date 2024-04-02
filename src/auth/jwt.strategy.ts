import { TokenPayload } from '@/interface';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import * as dotenv from 'dotenv';
import { UserRepository } from '@/user/user.repository';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly logger: Logger,
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    });
  }

  async validate(payload: TokenPayload, done: VerifiedCallback) {
    const { userName } = payload;
    const user = await this.userRepository.getUserByUsername(userName);

    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    return done(null, user);
  }
}
