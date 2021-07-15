import { IsNumber, IsString, MinLength } from 'class-validator';
import {
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  PrimaryColumn,
} from 'typeorm';

export class assignmentType {
  @IsString()
  @MinLength(1)
  name: string;

  @IsNumber()
  percentOfGrade: number;

  @IsNumber()
  currentGrade: number;
}

@Entity()
export class Class {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  teacher: string;

  @Column()
  assignmentTypes: assignmentType[];
}
