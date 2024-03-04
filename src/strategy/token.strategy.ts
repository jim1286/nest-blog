import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '@/interface';

@Injectable()
export class TokenStrategy {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async getAccessToken(payload: TokenPayload): Promise<string> {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('SECRET'),
      expiresIn: '10d',
    });
  }

  async getRefreshToken(payload: TokenPayload): Promise<string> {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('SECRET'),
      expiresIn: '10d',
    });
  }
}
