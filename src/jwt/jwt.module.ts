import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [UserModule],
  providers: [JwtStrategy],
  exports: [JwtStrategy],
})
export class JwtModule {}
