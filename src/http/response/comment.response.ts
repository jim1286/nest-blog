import { BaseResponse } from '../base.response';
import { CommentFavoriteEntityResponse } from './commentFavorite.response';

export interface CommentEntityResponse extends BaseResponse {
  content: string;
  userId: string;
  postId: string;
  parentId?: string;
  children: CommentEntityResponse[];
  commentFavorites: CommentFavoriteEntityResponse[];
}
