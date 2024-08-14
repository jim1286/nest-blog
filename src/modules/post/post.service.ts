import { PostRepository } from './post.repository';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '@/modules/user/user.repository';
import { PostEntity } from '@/entities';
import { CreatePostRequestDto, UpdatePostRequestDto } from '@/http';

@Injectable()
export class PostService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly postRepository: PostRepository,
  ) {}

  async createPost(body: CreatePostRequestDto, userId: string) {
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

  async getPostByPostId(postId: string): Promise<PostEntity> {
    const post = await this.postRepository.getPostById(postId);

    if (!post) {
      throw new NotFoundException('해당하는 글이 존재하지 않습니다.');
    }

    return post;
  }

  async deletePostByPostId(postId: string, userId: string) {
    const postList = await this.postRepository.getPostListByUserId(userId);

    if (postList.length === 0) {
      throw new NotFoundException('유저가 쓴 글이 존재하지 않습니다.');
    }

    if (!postList.find((post) => post.id === postId)) {
      throw new UnauthorizedException('작성자만 글을 삭제할 수 있습니다.');
    }

    try {
      await this.postRepository.deletePostById(postId);
      return { message: '삭제 완료' };
    } catch (error) {
      throw new Error('삭제 실패');
    }
  }

  async updatePostByPostId(
    body: UpdatePostRequestDto,
    postId: string,
    userId: string,
  ) {
    const postList = await this.postRepository.getPostListByUserId(userId);

    if (postList.length === 0) {
      throw new NotFoundException('유저가 쓴 글이 존재하지 않습니다.');
    }

    if (!postList.find((post) => post.id === postId)) {
      throw new UnauthorizedException('작성자만 글을 수정할 수 있습니다.');
    }

    try {
      await this.postRepository.updatePostById(body, postId);
      return { message: '수정 완료' };
    } catch (error) {
      throw new Error('수정 실패');
    }
  }

  async getPostListByUserId(userId: string): Promise<PostEntity[]> {
    return await this.postRepository.getPostListByUserId(userId);
  }

  async getPostListAll(): Promise<PostEntity[]> {
    return await this.postRepository.getPostListAll();
  }
}
