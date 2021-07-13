import { IsNumber, IsString, MinLength } from 'class-validator';
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

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
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  teacher: string;

  @Column()
  assignmentTypes: assignmentType[];
}
