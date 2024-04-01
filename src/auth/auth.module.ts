import { Logger, Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [UserModule],
  providers: [JwtStrategy, Logger],
  exports: [JwtStrategy],
})
export class AuthModule {}
