import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../interface/token.interface';
import * as dotenv from 'dotenv';

dotenv.config({ path: `.env.dev` });

@Injectable()
export class TokenStrategy {
  constructor(private readonly jwtService: JwtService) {}

  async getAccessToken(payload: TokenPayload): Promise<string> {
    return this.jwtService.sign(payload, {
      secret: process.env.Access_Secret,
      expiresIn: '10d',
    });
  }

  async getRefreshToken(payload: TokenPayload): Promise<string> {
    return this.jwtService.sign(payload, {
      secret: process.env.Access_Secret,
      expiresIn: '10d',
    });
  }
}
