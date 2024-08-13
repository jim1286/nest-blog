import { CommentFavoriteResponse } from './commentFavorite.response';
import { BaseResponse } from '../base.response';

export interface CommentResponse extends BaseResponse {
  content: string;
  isDeleted: boolean;
  userId: string;
  postId: string;
  parentId?: string;
  children: CommentResponse[];
  commentFavorites: CommentFavoriteResponse[];
}
