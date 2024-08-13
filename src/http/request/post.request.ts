import { IsOptional, IsString } from 'class-validator';

export class CreatePostRequestDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  subTitle: string;

  @IsString()
  content: string;
}

export class GetPostListRequestDto {
  @IsString()
  userId: string;
}

export class UpdatePostRequestDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  subTitle: string;

  @IsString()
  content: string;
}
