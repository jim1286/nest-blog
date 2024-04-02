import { IsString, MaxLength, MinLength } from 'class-validator';

export class SignIn {
  @IsString()
  userName: string;

  @IsString()
  password: string;
}

export class SignUp {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  userName: string;

  @IsString()
  password: string;
}

export class GetUser {
  @IsString()
  id: string;

  @IsString()
  userName: string;
}
