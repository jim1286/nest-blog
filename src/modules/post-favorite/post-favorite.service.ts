import { Injectable } from '@nestjs/common';
import { PostFavoriteRepository } from './post-favorite.repository';
import { MessageResponse, PostFavoriteEntityResponse } from '@/http';
import { UserService } from '../user/user.service';
import { PostService } from '../post/post.service';

@Injectable()
export class PostFavoriteService {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
    private readonly postFavoriteRepository: PostFavoriteRepository,
  ) {}

  async updateFavorite(
    userId: string,
    postId: string,
  ): Promise<MessageResponse> {
    const favorite = await this.postFavoriteRepository.getByUserIdAndPostId(
      userId,
      postId,
    );

    if (favorite) {
      try {
        await this.postFavoriteRepository.deleteById(favorite.id);
        return { message: '북마크 삭제 완료' };
      } catch (error) {
        throw new Error('북마크 삭제 실패');
      }
    }

    const user = await this.userService.getUserByUserId(userId);
    const post = await this.postService.getPostByPostId(postId);

    try {
      await this.postFavoriteRepository.save({ user, post });
      return { message: '북마크 생성 완료' };
    } catch (error) {
      throw new Error('북마크 생성 실패');
    }
  }

  async getFavoriteByUserIdAndPostId(
    userId: string,
    postId: string,
  ): Promise<PostFavoriteEntityResponse> {
    return await this.postFavoriteRepository.getByUserIdAndPostId(
      userId,
      postId,
    );
  }

  async getFavoriteListByUserId(
    userId: string,
  ): Promise<PostFavoriteEntityResponse[]> {
    return await this.postFavoriteRepository.getListByUserId(userId);
  }
}
