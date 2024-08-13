import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from '@/decorator';
import { JwtAuthGuard } from '@/guard';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  GetUserResponse,
  PostSignInRequestDto,
  PostSignInResponse,
  PostSignUpRequestDto,
  PostSignUpResponse,
} from '@/http';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signin')
  postSignIn(
    @Body(ValidationPipe) body: PostSignInRequestDto,
  ): Promise<PostSignInResponse> {
    return this.userService.signIn(body);
  }

  @Post('/signup')
  @UseInterceptors(FileInterceptor('image'))
  postSignUp(
    @Body(ValidationPipe) body: PostSignUpRequestDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<PostSignUpResponse> {
    return this.userService.createUser(body, file);
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  getUser(@GetUser('id') userId: string): Promise<GetUserResponse> {
    return this.userService.getUser(userId);
  }
}
