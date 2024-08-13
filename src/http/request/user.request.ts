import { IsString, MaxLength, MinLength } from 'class-validator';

export class PostSignInRequestDto {
  @IsString()
  userName: string;

  @IsString()
  password: string;
}

export class PostSignUpRequestDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  userName: string;

  @IsString()
  password: string;
}

export class GetUserRequestDto {
  @IsString()
  id: string;

  @IsString()
  userName: string;
}
