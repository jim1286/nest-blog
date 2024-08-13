import { BaseResponse } from '../base.response';

export interface TagResponseDto extends BaseResponse {
  content: string;
  postId: string;
}
