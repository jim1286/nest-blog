import { PostRepository } from './post.repository';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '@/modules/user/user.repository';
import {
  CreatePostRequestDto,
  MessageResponse,
  PostEntityResponse,
  UpdatePostRequestDto,
} from '@/http';

@Injectable()
export class PostService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly postRepository: PostRepository,
  ) {}

  async createPost(
    body: CreatePostRequestDto,
    userId: string,
  ): Promise<MessageResponse> {
    const user = await this.userRepository.getUserByUserId(userId);

    const newPost = this.postRepository.create({
      user,
      ...body,
    });

    try {
      await this.postRepository.save(newPost);
      return { message: '생성 완료' };
    } catch (error) {
      throw new Error('생성 실패');
    }
  }

  async getPostByPostId(postId: string): Promise<PostEntityResponse> {
    const post = await this.postRepository.getPostByPostId(postId);

    if (!post) {
      throw new NotFoundException('해당하는 글이 존재하지 않습니다.');
    }

    return post;
  }

  async deletePostByPostId(
    postId: string,
    userId: string,
  ): Promise<MessageResponse> {
    const postList = await this.postRepository.getPostListByUserId(userId);

    if (postList.length === 0) {
      throw new NotFoundException('유저가 쓴 글이 존재하지 않습니다.');
    }

    if (!postList.find((post) => post.id === postId)) {
      throw new UnauthorizedException('작성자만 글을 삭제할 수 있습니다.');
    }

    try {
      await this.postRepository.deletePostByPostId(postId);
      return { message: '삭제 완료' };
    } catch (error) {
      throw new Error('삭제 실패');
    }
  }

  async updatePostByPostId(
    body: UpdatePostRequestDto,
    postId: string,
    userId: string,
  ): Promise<MessageResponse> {
    const postList = await this.postRepository.getPostListByUserId(userId);

    if (postList.length === 0) {
      throw new NotFoundException('유저가 쓴 글이 존재하지 않습니다.');
    }

    if (!postList.find((post) => post.id === postId)) {
      throw new UnauthorizedException('작성자만 글을 수정할 수 있습니다.');
    }

    try {
      await this.postRepository.updatePostByPostId(body, postId);
      return { message: '수정 완료' };
    } catch (error) {
      throw new Error('수정 실패');
    }
  }

  async getPostListByUserId(userId: string): Promise<PostEntityResponse[]> {
    return await this.postRepository.getPostListByUserId(userId);
  }

  async getPostListAll(): Promise<PostEntityResponse[]> {
    return await this.postRepository.getPostListAll();
  }
}
