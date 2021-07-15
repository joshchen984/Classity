import { IsNumber, IsString, MinLength } from 'class-validator';
import { Column } from 'typeorm';

export class assignmentType {
  @IsString()
  @MinLength(1)
  name: string;

  @IsNumber()
  percentOfGrade: number;

  @IsNumber()
  currentGrade: number;
}

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
