import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenPayload } from '@/interface';
import { TokenStrategy } from '@/strategy/token.strategy';
import * as bcrypt from 'bcrypt';
import { S3Service } from '@/s3/s3.service';
import { RoleEnum } from '@/enum';
import { UserRepository } from './user.repository';
import { PostSignInRequestDto, PostSignUpRequestDto } from '@/http';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenStrategy: TokenStrategy,
    private readonly s3Service: S3Service,
  ) {}

  async signIn(body: PostSignInRequestDto) {
    const { userName, password } = body;
    const user = await this.userRepository.getUserByUsername(userName);

    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new UnauthorizedException('비밀번호가 맞지 않습니다.');
    }

    const payload: TokenPayload = {
      id: user.id,
      userName: user.userName,
    };

    const accessToken = await this.tokenStrategy.getAccessToken(payload);
    const refreshToken = await this.tokenStrategy.getRefreshToken(payload);

    return { accessToken, refreshToken };
  }

  async createUser(body: PostSignUpRequestDto, file?: Express.Multer.File) {
    const { userName, password } = body;
    const user = await this.userRepository.getUserByUsername(userName);

    if (user) {
      throw new NotAcceptableException('동일한 유저 아이디가 존재합니다.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = this.userRepository.create({
      userName,
      password: hashedPassword,
      role: RoleEnum.USER,
    });

    if (file) {
      try {
        const thumbnailUrl = await this.s3Service.uploadImage(file);
        newUser.thumbnailUrl = thumbnailUrl.imageUrl;
      } catch (error) {
        throw new Error('이미지 업로드 실패');
      }
    }
    await this.userRepository.save(newUser);

    return { message: '생성 완료' };
  }

  async getUser(userId: string) {
    const user = await this.userRepository.getUserByUserId(userId);

    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    return {
      id: user.id,
      userName: user.userName,
    };
  }
}
