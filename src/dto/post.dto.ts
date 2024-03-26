import { IsOptional, IsString } from 'class-validator';

export class CreateDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  subTitle: string;

  @IsString()
  content: string;
}

export class GetPostListDto {
  @IsString()
  userId: string;
}
