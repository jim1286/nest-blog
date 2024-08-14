import { IsString } from 'class-validator';

export class CreateCommentRequestDto {
  @IsString()
  content: string;
}
