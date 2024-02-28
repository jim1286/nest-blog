import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from '../dto';
import { AuthResponse } from '../response';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signin')
  signIn(@Body(ValidationPipe) signInDto: UserDto.SignInDto) {
    return this.userService.signIn();
  }

  @Post('/signup')
  signUp(@Body(ValidationPipe) signUpDto: UserDto.SignUpDto) {
    return this.userService.signUp();
  }
}
