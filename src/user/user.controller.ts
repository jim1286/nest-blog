import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from '../dto';
import { AuthGuard } from '../guard/auth.guard';
import { GetUser } from '../decorator/getUser.decorator';
import { UserResponse } from '../response';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) signInDto: UserDto.SignInDto,
  ): Promise<UserResponse.SignIn> {
    return this.userService.signIn(signInDto);
  }

  @Post('/signup')
  signUp(@Body(ValidationPipe) signUpDto: UserDto.SignUpDto) {
    return this.userService.signUp(signUpDto);
  }

  @Get('/')
  @UseGuards(AuthGuard)
  getUser(@GetUser() user: UserDto.GetUserDto): Promise<UserResponse.GetUser> {
    return this.userService.getUser(user);
  }
}
