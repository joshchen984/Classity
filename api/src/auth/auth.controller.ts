import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './create-user.dto';
import { Roles } from './roles.decorator';
import { UserId } from './userid.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Roles('User')
  @Post('/signup')
  signUp(@Body() createUserDto: CreateUserDto, @UserId() userId: string) {
    return this.authService.signUp(createUserDto, userId);
  }
}
