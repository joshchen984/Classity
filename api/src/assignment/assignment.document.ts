import { Column } from 'typeorm';
import { v4 as uuid } from 'uuid';

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

  @Column()
  createdAt: Date;

  constructor(
    name: string,
    description: string,
    type: string,
    pointsReceived: number,
    pointsWorth: number,
  ) {
    this.id = uuid();
    this.name = name;
    this.description = description;
    this.type = type;
    this.pointsReceived = pointsReceived;
    this.pointsWorth = pointsWorth;
    this.createdAt = new Date();
  }
}
