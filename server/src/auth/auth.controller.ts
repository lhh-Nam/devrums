import { Body, Controller, Post } from '@nestjs/common';
import { UserRegisterDto } from './dto/userRegister.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() request: UserRegisterDto): void {
    this.authService.register(request);
  }
}
