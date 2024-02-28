import { IsString, MaxLength, MinLength } from 'class-validator';

export class SignInDto {
  @IsString()
  userName: string;

  @IsString()
  password: string;
}

export class SignUpDto {
  @IsString()
  name: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  userName: string;

  @IsString()
  password: string;
}

export class GetUserDto {
  @IsString()
  userId: string;

  @IsString()
  name: string;

  @IsString()
  userName: string;
}
