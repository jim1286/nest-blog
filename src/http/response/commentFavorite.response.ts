import { BaseResponse } from '../base.response';

export interface CommentFavoriteEntityResponse extends BaseResponse {
  userId: string;
  commentId: string;
}
