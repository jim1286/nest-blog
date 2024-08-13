import { BaseResponse } from '../base.response';

export interface CommentFavoriteResponse extends BaseResponse {
  userId: string;
  commentId: string;
}
