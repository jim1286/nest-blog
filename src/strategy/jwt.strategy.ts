import { TokenPayload } from '@/interface';
import { UserService } from '@/user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import * as dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    });
  }

  async validate(payload: TokenPayload, done: VerifiedCallback) {
    const { userName } = payload;
    const user = await this.userService.findUserByUsername(userName);

    if (!user) {
      throw new BadRequestException('유저가 존재하지 않습니다.');
    }

    return done(null, user);
  }
}
