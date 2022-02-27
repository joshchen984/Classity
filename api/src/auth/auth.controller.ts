import { Body, Controller, Delete, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userDto } from '@classity/dto';
import { Roles } from './roles.decorator';
import { UserId } from './userid.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Roles('User')
  @Post('/signup')
  signUp(
    @Body() createUserDto: userDto.CreateUserDto,
    @UserId() userId: string,
  ) {
    return this.authService.signUp(createUserDto, userId);
  }

  @Roles('User')
  @Delete('/delete')
  deleteAccount(@UserId() userId: string) {
    return this.authService.deleteAccount(userId);
  }
}
