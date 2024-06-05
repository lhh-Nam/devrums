import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserRegisterDto } from './dto/userRegister.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() request: UserRegisterDto): Promise<User> {
    return this.authService.register(request);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  login(@Body() request: LoginDto): Promise<any> {
    return this.authService.login(request);
  }

  @Post('refresh-token')
  refreshToken(@Body() request: { refreshToken: string }): void {
    this.authService.refreshToken(request.refreshToken);
  }
}
