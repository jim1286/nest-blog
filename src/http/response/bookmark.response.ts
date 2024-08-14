import { BaseResponse } from '../base.response';

export interface BookmarkEntityResponse extends BaseResponse {
  userId: string;
  postId: string;
}
