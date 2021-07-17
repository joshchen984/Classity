import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateClassDto } from 'classity-dto';
import { User } from 'src/auth/user.entity';
import { Class } from './class.document';
import { ObjectId } from 'mongodb';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(User) private userRepository: MongoRepository<User>,
  ) {}

  async createClass(createClassDto: CreateClassDto, userId: string) {
    const { name, teacher, assignmentTypes } = createClassDto;
    const newClass = new Class(name, teacher, assignmentTypes);
    const { result } = await this.userRepository.updateOne(
      { id: userId },
      { $push: { classes: newClass } },
    );
    if (result.nModified === 0) {
      throw new UnauthorizedException();
    }
    return newClass;
  }

  async getUserClasses(userId: string) {
    const user = await this.userRepository.findOne({ id: userId });
    return user.classes;
  }
}
