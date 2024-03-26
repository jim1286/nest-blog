import { PostDto } from '@/dto';
import { PostRepository } from './post.repository';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/user/user.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly postRepository: PostRepository,
  ) {}

  async createPost(body: PostDto.CreateDto, userName: string) {
    const user = await this.userRepository.findUserByUsername(userName);
    const newPost = {
      user: user,
      isDeleted: false,
      ...body,
    };

    await this.postRepository.save(newPost);

    return '생성완료';
  }

  async getPostListByUserId(userId: string): Promise<any> {
    const postList = await this.postRepository.getPostListByUserId(userId);

    return postList;
  }
}
