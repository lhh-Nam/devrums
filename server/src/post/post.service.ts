import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/createPost.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async createPost(userId: number, request: CreatePostDto): Promise<Post> {
    const user = await this.userRepository.findOneBy({ id: userId });

    try {
      const res = await this.postRepository.save({ ...request, user });
      return await this.postRepository.findOneBy({ id: res.id });
    } catch (error) {
      throw new HttpException('Create new post fail!', HttpStatus.BAD_REQUEST);
    }
  }
}
