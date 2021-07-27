import { Column } from 'typeorm';

export class Assignment {
  @Column()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column()
  pointsReceived: number;

  @Column()
  pointsWorth: number;
}
