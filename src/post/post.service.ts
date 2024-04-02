import { PostValidate } from '@/dto';
import { PostRepository } from './post.repository';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '@/user/user.repository';
import { PostEntity } from '@/entities';

@Injectable()
export class PostService {
  constructor(
    private readonly logger: Logger,
    private readonly userRepository: UserRepository,
    private readonly postRepository: PostRepository,
  ) {}

  async createPost(body: PostValidate.CreatePost, userId: string) {
    const user = await this.userRepository.getUserById(userId);
    const newPost = {
      user: user,
      isDeleted: false,
      ...body,
    };

    await this.postRepository.save(newPost);

    return '생성 완료';
  }

  async getPostByPostId(postId: string): Promise<PostEntity> {
    const post = await this.postRepository.getPostById(postId);

    return post;
  }

  async getAllPostList(): Promise<PostEntity[]> {
    const postList = await this.postRepository.getAllPostList();

    return postList;
  }

  async getPostListByUserId(userId: string): Promise<PostEntity[]> {
    const postList = (await this.userRepository.getPostListById(userId)).posts;

    return postList;
  }

  async deletePostByPostId(postId: string, userId: string) {
    const postList = await this.getPostListByUserId(userId);

    if (!postList.find((post) => post.id === postId)) {
      throw new UnauthorizedException('작성자만 글을 삭제할 수 있습니다.');
    }

    await this.postRepository.deletePostById(postId);

    return '삭제 완료';
  }

  async updatePostByPostId(
    body: PostValidate.UpdatePost,
    postId: string,
    userId: string,
  ) {
    const postList = await this.getPostListByUserId(userId);

    if (!postList.find((post) => post.id === postId)) {
      throw new UnauthorizedException('작성자만 글을 수정할 수 있습니다.');
    }

    await this.postRepository.updatePostById(body, postId);

    return '수정 완료';
  }
}
