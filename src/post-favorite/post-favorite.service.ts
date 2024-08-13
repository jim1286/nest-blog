import { Injectable } from '@nestjs/common';
import { PostFavoriteRepository } from './post-favorite.repository';
import { UserRepository } from '@/user/user.repository';
import { PostRepository } from '@/post/post.repository';

@Injectable()
export class PostFavoriteService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly postRepository: PostRepository,
    private readonly postFavoriteRepository: PostFavoriteRepository,
  ) {}

  async updateFavorite(userId: string, postId: string) {
    const favorite = await this.postFavoriteRepository.getByUserIdAndPostId(
      userId,
      postId,
    );

    if (favorite) {
      await this.postFavoriteRepository.deleteById(favorite.id);
      return '북마크 삭제 완료';
    }

    const user = await this.userRepository.getUserByUserId(userId);
    const post = await this.postRepository.getPostById(postId);

    await this.postFavoriteRepository.save({ user, post, userId, postId });
    return '북마크 생성 완료';
  }

  async getFavorite(userId: string, postId: string) {
    return (
      (await this.postFavoriteRepository.getByUserIdAndPostId(
        userId,
        postId,
      )) || '북마크 없음'
    );
  }

  async getFavoriteList(userId: string) {
    return await this.postFavoriteRepository.getListByUserId(userId);
  }
}
