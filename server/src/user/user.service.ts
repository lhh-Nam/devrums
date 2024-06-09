import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { FilterUserDto } from './dto/filterUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(query: FilterUserDto): Promise<any> {
    const itemsPerPage = Number(query.itemsPerPage) || 10;
    const currentPage = Number(query.page) || 1;
    const searchKey = query.search ?? '';
    const skip = (currentPage - 1) * itemsPerPage;

    const sqlQueryString = '%' + searchKey + '%';
    const [res, total] = await this.userRepository.findAndCount({
      where: [
        {
          firstName: Like(sqlQueryString),
        },
        {
          lastName: Like(sqlQueryString),
        },
        {
          email: Like(sqlQueryString),
        },
      ],
      order: { createdOn: 'DESC' },
      take: itemsPerPage,
      skip: skip,
      select: ['id', 'firstName', 'lastName', 'email', 'status'],
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

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async update(id: number, request: UpdateUserDto): Promise<UpdateResult> {
    return await this.userRepository.update(id, request);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
