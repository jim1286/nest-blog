import { Expose } from 'class-transformer';

export class GetUser {
  @Expose()
  id: string;
  @Expose()
  userName: string;
}

export class SignIn {
  @Expose()
  accessToken: string;
  @Expose()
  refreshToken: string;
}
