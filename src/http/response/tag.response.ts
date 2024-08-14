import { BaseResponse } from '../base.response';

export interface TagEntityResponse extends BaseResponse {
  content: string;
  postId: string;
}
