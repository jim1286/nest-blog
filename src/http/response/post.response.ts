import { BaseResponse } from './../base.response';
import { BookmarkResponse } from './bookmark.response';
import { PostFavoriteResponse } from './postFavorite.response';
import { CommentResponse } from './comment.response';
import { TagResponseDto } from './tag.response';

export interface PostResponse extends BaseResponse {
  title: string;
  subTitle?: string;
  content: string;
  userId: string;
  tags: TagResponseDto[];
  comments: CommentResponse[];
  bookmarks: BookmarkResponse[];
  postFavorites: PostFavoriteResponse[];
}
