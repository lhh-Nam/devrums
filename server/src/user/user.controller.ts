import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() request: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.userService.update(Number(id), request);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.userService.delete(Number(id));
  }
}
