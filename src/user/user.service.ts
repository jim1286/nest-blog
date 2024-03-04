import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserResponse } from '@/response';
import { UserDto } from '@/dto';
import { UserEntity } from '@/entities';
import { TokenPayload } from '@/interface';
import { TokenStrategy } from '@/strategy/token.strategy';
import * as bcrypt from 'bcrypt';
import { UtilService } from '@/util/util.service';
import { S3Service } from '@/s3/s3.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly tokenStrategy: TokenStrategy,
    private readonly utilService: UtilService,
    private readonly s3Service: S3Service,
  ) {}

  async signIn(body: UserDto.SignInDto): Promise<UserResponse.SignIn> {
    const { userName, password } = body;
    const user = await this.findUserByUsername(userName);

    if (!user) {
      throw new BadRequestException('유저가 존재하지 않습니다.');
    }

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
      userId: this.utilService.getUUID(),
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

    const res: UserResponse.GetUser = {
      userId: user.userId,
      name: user.name,
      userName: user.userName,
    };

    return res;
  }

  async uploadFile(file: Express.Multer.File) {
    const imageName = this.utilService.getUUID();
    const ext = file.originalname.split('.').pop();

    const imageUrl = await this.s3Service.imageUploadToS3(
      `${imageName}.${ext}`,
      file,
      ext,
    );

    return { imageUrl };
  }

  async findUserByUsername(userName: string) {
    const user = await this.userRepository.findOne({
      where: { userName },
    });

    return user;
  }
}
