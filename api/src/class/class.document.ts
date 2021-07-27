import { Column } from 'typeorm';
import { assignmentType } from '@classity/dto';
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
  assignmentTypes: assignmentType[];

  @Column((type) => Assignment)
  assignments: Assignment[];

  constructor(
    name: string,
    teacher: string,
    assignmentTypes: assignmentType[],
  ) {
    this.name = name;
    this.teacher = teacher;
    this.assignmentTypes = assignmentTypes;
    this.id = uuid();
  }
}
