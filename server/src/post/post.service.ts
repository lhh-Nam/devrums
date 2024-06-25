import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Like, Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/createPost.dto';
import { FilterPostDto } from './dto/filterPost.dto';

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

  async findAll(query: FilterPostDto): Promise<any> {
    const itemsPerPage = Number(query.itemsPerPage) || 10;
    const currentPage = Number(query.page) || 1;
    const searchKey = query.search ?? '';
    const skip = (currentPage - 1) * itemsPerPage;

    const sqlQueryString = '%' + searchKey + '%';
    const [res, total] = await this.postRepository.findAndCount({
      where: [
        { title: Like(sqlQueryString) },
        { description: Like(sqlQueryString) },
      ],
      order: { createdOn: 'DESC' },
      skip,
      take: itemsPerPage,
      relations: {
        user: true,
      },
      select: {
        user: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          avatar: true,
        },
      },
    });

    const lastPage = Math.ceil(total / itemsPerPage);
    const nextPage = currentPage + 1 > lastPage ? null : currentPage + 1;
    const prevPage = currentPage - 1 < 0 ? null : currentPage - 1;

    return {
      data: res,
      total,
      currentPage,
      nextPage,
      prevPage,
      lastPage,
    };
  }

  async findDetail(id: number): Promise<Post> {
    return await this.postRepository.findOne({
      where: { id },
      relations: ['user'],
      select: {
        user: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          avatar: true,
        },
      },
    });
  }
}
