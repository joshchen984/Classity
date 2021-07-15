import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  onApplicationBootstrap() {}

  async signUp(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const user = this.userRepository.create({ email, id: uuid() });
    let createdUser: User;
    try {
      createdUser = await this.userRepository.save(user);
    } catch (e) {
      // duplicate key error
      if (e.code === 11000) {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return createdUser;
  }
}
