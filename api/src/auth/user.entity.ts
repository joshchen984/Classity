import { Class } from '../class/class.document';
import { Column, Entity, ObjectIdColumn, ObjectID, Index } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  @Index({ unique: true })
  id: string;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column((type) => Class)
  classes: Class[];
}
