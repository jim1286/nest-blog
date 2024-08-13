import { BaseResponse } from '../base.response';

export interface BookmarkResponse extends BaseResponse {
  userId: string;
  postId: string;
}
