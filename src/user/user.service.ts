import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserResponse } from '@/response';
import { UserDto } from '@/dto';
import { TokenPayload, User } from '@/interface';
import { TokenStrategy } from '@/strategy/token.strategy';
import * as bcrypt from 'bcrypt';
import { S3Service } from '@/s3/s3.service';
import { RoleEnum } from '@/enum';
import { UtilStrategy } from '@/strategy';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenStrategy: TokenStrategy,
    private readonly utilStrategy: UtilStrategy,
    private readonly s3Service: S3Service,
  ) {}

  async signIn(body: UserDto.SignInDto): Promise<UserResponse.SignIn> {
    const { userName, password } = body;
    const user = await this.userRepository.findUserByUsername(userName);

    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new BadRequestException('비밀번호가 맞지 않습니다.');
    }

    const payload: TokenPayload = {
      id: user.id,
      userName: user.userName,
    };

    const accessToken = await this.tokenStrategy.getAccessToken(payload);
    const refreshToken = await this.tokenStrategy.getRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signUp(body: UserDto.SignUpDto, file?: Express.Multer.File) {
    const { userName, password } = body;
    const user = await this.userRepository.findUserByUsername(userName);

    if (user) {
      throw new BadRequestException('동일한 유저 아이디가 존재합니다.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser: User = {
      id: this.utilStrategy.getUUID(),
      userName: userName,
      password: hashedPassword,
      role: RoleEnum.USER,
    };

    if (file) {
      const thumbnailUrl = await this.s3Service.uploadImage(file);
      newUser.thumbnailUrl = thumbnailUrl.imageUrl;
    }

    await this.userRepository.saveUser(newUser);

    return '생성완료';
  }

  async getUser(body: UserDto.GetUserDto): Promise<UserResponse.GetUser> {
    const { userName } = body;
    const user = await this.userRepository.findUserByUsername(userName);

    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    const res: UserResponse.GetUser = {
      id: user.id,
      userName: user.userName,
    };

    return res;
  }
}
