import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { classDto } from '@classity/dto';
import { User } from '../auth/user.entity';
import { Class } from './class.document';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(User) private userRepository: MongoRepository<User>,
  ) {}

  async createClass(createClassDto: classDto.CreateClassDto, userId: string) {
    const { name, teacher, assignmentTypes } = createClassDto;
    const uniqueAssignmentTypes = new Set();
    assignmentTypes.forEach((assignmentType) => {
      uniqueAssignmentTypes.add(assignmentType.name);
    });
    if (uniqueAssignmentTypes.size !== assignmentTypes.length) {
      throw new BadRequestException();
    }
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
  async getUserClass(userId: string, classId: string) {
    const user = await this.userRepository.findOne({ id: userId });
    const selectedClass = user.classes.filter(
      (curClass) => curClass.id === classId,
    );
    if (!selectedClass) {
      throw new NotFoundException();
    }
    return selectedClass[0];
  }

  async deleteClassById(id: string, userId: string) {
    const { result } = await this.userRepository.updateOne(
      { id: userId },
      { $pull: { classes: { id } } },
    );
    if (result.nModified === 0) {
      throw new UnauthorizedException();
    }
  }
}
