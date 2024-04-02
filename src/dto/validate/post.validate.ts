import { IsOptional, IsString } from 'class-validator';

export class CreatePost {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  subTitle: string;

  @IsString()
  content: string;
}

export class GetPostList {
  @IsString()
  userId: string;
}

export class UpdatePost {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  subTitle: string;

  @IsString()
  content: string;
}
