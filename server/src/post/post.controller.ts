import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreatePostDto } from './dto/createPost.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, storageConfig } from 'helpers/config';
import { PostService } from './post.service';

@Controller('post')
@UseGuards(AuthGuard)
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: storageConfig('post'),
      fileFilter: fileFilter,
    }),
  )
  createPost(
    @Req() req: any,
    @Body() createPost: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const newPost = {
      ...createPost,
      thumbnail: file.destination + '/' + file.filename,
    };
    return this.postService.createPost(req.user_data.id, newPost);
  }
}
