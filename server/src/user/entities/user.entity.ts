import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 1 })
  status: number;

  @Column()
  refreshToken: string;

  @CreateDateColumn()
  createdOn: Date;

  @CreateDateColumn()
  updatedOn: Date;
}
