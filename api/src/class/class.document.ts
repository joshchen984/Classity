import { Column } from 'typeorm';
import { assignmentType } from 'classity-dto';

export class Class {
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
  }
}
