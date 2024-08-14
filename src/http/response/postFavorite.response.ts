import { BaseResponse } from '../base.response';

export interface PostFavoriteEntityResponse extends BaseResponse {
  userId: string;
  postId: string;
}
