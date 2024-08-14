import { BaseResponse } from '../base.response';
import { RoleEnum } from '@/enums';
import { PostResponse } from './post.response';
import { BookmarkResponse } from './bookmark.response';
import { PostFavoriteResponse } from './postFavorite.response';
import { CommentResponse } from './comment.response';
import { CommentFavoriteResponse } from './commentFavorite.response';
import { BaseMessageResponse } from '../message.response';

export interface UserResponse extends BaseResponse {
  userName: string;
  thumbnailUrl?: string;
  role: RoleEnum;
  posts: PostResponse[];
  bookmarks: BookmarkResponse[];
  postFavorites: PostFavoriteResponse[];
  comments: CommentResponse[];
  commentFavorites: CommentFavoriteResponse[];
}

export interface GetUserResponse {
  id: string;
  userName: string;
}

export interface PostSignUpResponse extends BaseMessageResponse {}

export interface PostSignInResponse {
  accessToken: string;
  refreshToken: string;
}
