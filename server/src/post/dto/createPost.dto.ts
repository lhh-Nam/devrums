import { User } from 'src/user/entities/user.entity';

export class CreatePostDto {
  title: string;
  description: string;
  thumbnail: string;
  status: number;
  createdBy: User;
}
