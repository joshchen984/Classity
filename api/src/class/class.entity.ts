import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

type assignmentType = {
  name: string;
  percentOfGrade: number;
  currentGrade: number;
};

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
