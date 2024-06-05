import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserRegisterDto } from './dto/userRegister.dto';
import * as bcrypt from 'bcrypt';
import { GenerateTokenDto, LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(request: UserRegisterDto): Promise<User> {
    const hashPassword = await this.hashPassword(request.password);

    const newReq = {
      ...request,
      password: hashPassword,
      refreshToken: 'refresh_token_string',
    };

    return await this.UserRepository.save(newReq);
  }

  async login(request: LoginDto): Promise<any> {
    const user = await this.UserRepository.findOne({
      where: { email: request.email },
    });

    if (!user) {
      throw new HttpException('Email is not exist.', HttpStatus.NOT_FOUND);
    }

    const checkPass = bcrypt.compareSync(request.password, user.password);
    if (!checkPass) {
      throw new HttpException(
        'Password is not correct.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    return await this.generateToken(payload);
  }

  async refreshToken(refreshToken: string): Promise<any> {
    try {
      const verify = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get('JWT_SECRET_KEY'),
      });

      const isExistToken = await this.UserRepository.findOneBy({
        email: verify.email,
        refreshToken: refreshToken,
      });

      if (isExistToken) {
        const payload = {
          id: verify.id,
          email: verify.email,
        };
        return await this.generateToken(payload);
      } else {
        throw new HttpException(
          'Refresh token is invalid.',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Refresh token is invalid.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async generateToken(payload: GenerateTokenDto) {
    const acessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET_KEY'),
      expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRE_IN'),
    });

    await this.UserRepository.update(
      { email: payload.email },
      { refreshToken },
    );

    return { acessToken, refreshToken };
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
  }
}
