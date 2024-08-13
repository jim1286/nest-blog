import { BaseResponse } from '../base.response';

export interface PostFavoriteResponse extends BaseResponse {
  userId: string;
  postId: string;
}
