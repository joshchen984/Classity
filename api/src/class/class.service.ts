import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateClassDto } from './create-class.dto';
import { User } from 'src/auth/user.entity';
import { Class } from './class.document';
import { ObjectId } from 'mongodb';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(User) private userRepository: MongoRepository<User>,
  ) {}

  async createClass(createClassDto: CreateClassDto) {
    const { name, teacher, assignmentTypes, userId } = createClassDto;
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

  // async getClass(id: string) {
  //   const foundClass = await this.classRepository.findOne({
  //     where: { id },
  //   });
  //   if (!foundClass) {
  //     throw new NotFoundException();
  //   }
  //   return foundClass;
  // }
}
