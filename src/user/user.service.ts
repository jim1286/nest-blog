import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserDto } from '../dto';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { TokenPayload } from '../interface/token.interface';
import { TokenStrategy } from '../strategy/token.strategy';
import { UserResponse } from '../response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly tokenStrategy: TokenStrategy,
  ) {}

  async signIn(body: UserDto.SignInDto): Promise<UserResponse.SignIn> {
    const { userName, password } = body;
    const user = await this.findUserByUsername(userName);
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new BadRequestException('비밀번호가 맞지 않습니다.');
    }

    const payload: TokenPayload = {
      userId: user.userId,
      user: user.name,
      userName: user.userName,
    };

    const accessToken = await this.tokenStrategy.getAccessToken(payload);
    const refreshToken = await this.tokenStrategy.getRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signUp(body: UserDto.SignUpDto) {
    const { name, userName, password } = body;
    const user = await this.findUserByUsername(userName);

    if (user) {
      throw new BadRequestException('동일한 유저 아이디가 존재합니다.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createUser = {
      userId: uuid(),
      name,
      userName,
      password: hashedPassword,
    };

    await this.userRepository.save(createUser);

    return '생성완료';
  }

  async getUser(body: UserDto.GetUserDto): Promise<UserResponse.GetUser> {
    const { userName } = body;
    const user = await this.findUserByUsername(userName);

    if (!user) {
      throw new BadRequestException('유저가 존재하지 않습니다.');
    }

    const res = {
      userId: user.userId,
      name: user.name,
      userName: user.userName,
    };

    return res;
  }

  async findUserByUsername(userName: string) {
    const user = await this.userRepository.findOne({
      where: { userName },
    });

    if (!user) {
      throw new BadRequestException('유저가 존재하지 않습니다.');
    }

    return user;
  }
}
