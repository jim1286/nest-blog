import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { TokenPayload } from '../interface/token.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('Access_Secret'),
    });
  }

  async validate(payload: TokenPayload, done: VerifiedCallback) {
    const { userName } = payload;
    const user = await this.userService.findUserByUsername(userName);

    return done(null, user);
  }
}
