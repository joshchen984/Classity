import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './class.entity';
import { v4 as uuid } from 'uuid';
import { CreateClassDto } from './create-class.dto';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class) private classRepository: Repository<Class>,
  ) {}

  createClass(createClassDto: CreateClassDto) {
    const { name, teacher, assignmentTypes } = createClassDto;
    const newClass = this.classRepository.create({
      id: uuid(),
      name,
      teacher,
      assignmentTypes,
    });
    return this.classRepository.save(newClass);
  }
}
