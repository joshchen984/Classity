import { Column } from 'typeorm';
import { classDto } from '@classity/dto';
import { v4 as uuid } from 'uuid';
import { Assignment } from '../assignment/assignment.document';

export class Class {
  @Column()
  id: string;

  @Column()
  name: string;

  @Column()
  teacher: string;

  @Column()
  assignmentTypes: classDto.assignmentType[];

  @Column()
  grade: number;

  @Column((type) => Assignment)
  assignments: Assignment[];

  @Column()
  createdAt: Date;

  constructor(
    name: string,
    teacher: string,
    assignmentTypes: classDto.assignmentType[],
  ) {
    this.name = name;
    this.teacher = teacher;
    this.assignmentTypes = assignmentTypes;
    this.id = uuid();
    this.grade = 100;
    this.createdAt = new Date();
  }
}
