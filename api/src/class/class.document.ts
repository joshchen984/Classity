import { Column } from 'typeorm';
import { assignmentType } from '@classity/dto';
import { v4 as uuid } from 'uuid';

export class Class {
  @Column()
  id: string;

  @Column()
  name: string;

  @Column()
  teacher: string;

  @Column()
  assignmentTypes: assignmentType[];

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
