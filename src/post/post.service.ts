import { PostDto } from '@/dto';
import { PostRepository } from './post.repository';
import { Injectable } from '@nestjs/common';
import { UtilStrategy } from '@/strategy';
import { UserRepository } from '@/user/user.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly postRepository: PostRepository,
    private readonly utilStrategy: UtilStrategy,
  ) {}

  async create(body: PostDto.CreateDto, userId: string): Promise<any> {
    const user = await this.userRepository.findUserById(userId);
    const newPost = {
      id: this.utilStrategy.getUUID(),
      user: user,
      ...body,
    };

    await this.postRepository.save(newPost);
  }
}
