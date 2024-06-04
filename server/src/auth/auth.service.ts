import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserRegisterDto } from './dto/userRegister.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
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

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
  }
}
