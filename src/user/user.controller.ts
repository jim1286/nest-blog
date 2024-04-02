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
import { UserResponse, UserValidate } from '@/dto';
import { JwtAuthGuard } from '@/guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) signInDto: UserValidate.SignIn,
  ): Promise<UserResponse.SignIn> {
    return this.userService.signIn(signInDto);
  }

  @Post('/signup')
  @UseInterceptors(FileInterceptor('image'))
  createUser(
    @Body(ValidationPipe) signUpDto: UserValidate.SignUp,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.userService.createUser(signUpDto, file);
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  getUser(@GetUser('id') userId: string): Promise<UserResponse.GetUser> {
    return this.userService.getUser(userId);
  }
}
