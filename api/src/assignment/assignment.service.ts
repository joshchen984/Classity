import { Injectable, NotFoundException } from '@nestjs/common';
import { assignmentDto } from '@classity/dto';
import { Assignment } from './assignment.document';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(User) private userRepository: MongoRepository<User>,
  ) {}

  async createAssignment(
    createAssignmentDto: assignmentDto.CreateAssignmentDto,
    userId: string,
  ) {
    const {
      name,
      description,
      assignmentType,
      pointsWorth,
      pointsReceived,
      classId,
    } = createAssignmentDto;
    const assignment = new Assignment(
      name,
      description,
      assignmentType,
      pointsReceived,
      pointsWorth,
    );
    const user: User = await this.userRepository.findOne({ id: userId });
    if (!user) {
      throw new NotFoundException();
    }
    let updated = false;
    for (const userClass of user.classes) {
      if (userClass.id === classId) {
        if (userClass.assignments === undefined) {
          userClass.assignments = [assignment];
        } else {
          userClass.assignments.push(assignment);
        }
        updated = true;
        break;
      }
    }
    if (!updated) {
      throw new NotFoundException();
    }
    await this.userRepository.save(user);
    return assignment;
  }
}
