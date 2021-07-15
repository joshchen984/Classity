import { Column, Entity, ObjectIdColumn, ObjectID, Index } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  @Index({ unique: true })
  email: string;
}
