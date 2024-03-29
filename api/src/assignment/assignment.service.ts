import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { assignmentDto } from '@classity/dto';
import { Assignment } from './assignment.document';
import { Class } from '../class/class.document';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class AssignmentService {
  private readonly logger = new Logger(AssignmentService.name);
  constructor(
    @InjectRepository(User) private userRepository: MongoRepository<User>,
  ) {}

  private updateGrade(
    userClass: Class,
    assignmentTypeName: string,
    pointsReceived: number,
    pointsWorth: number,
    isAddingAssignment: boolean = true,
  ) {
    const assignmentType = userClass.assignmentTypes.find(
      (element) => element.name === assignmentTypeName,
    );
    const prevGrade = assignmentType.currentGrade;
    if (isAddingAssignment) {
      assignmentType.pointsReceived += pointsReceived;
      assignmentType.pointsWorth += pointsWorth;
    } else {
      assignmentType.pointsReceived -= pointsReceived;
      assignmentType.pointsWorth -= pointsWorth;
    }
    if (assignmentType.pointsWorth !== 0) {
      assignmentType.currentGrade =
        (assignmentType.pointsReceived / assignmentType.pointsWorth) *
        assignmentType.percentOfGrade;
    } else {
      assignmentType.currentGrade = assignmentType.percentOfGrade;
    }
    userClass.grade += assignmentType.currentGrade - prevGrade;
  }

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
        let assignmentTypeIndex = userClass.assignmentTypes.findIndex(
          (assignType) => assignType.name === assignmentType,
        );
        if (assignmentTypeIndex !== -1) {
          if (userClass.assignments === undefined) {
            userClass.assignments = [assignment];
          } else {
            userClass.assignments.unshift(assignment);
          }
          this.updateGrade(
            userClass,
            assignmentType,
            pointsReceived,
            pointsWorth,
          );
          updated = true;
        } else {
          throw new BadRequestException(
            `No assignment type that matches the name ${assignmentType}`,
          );
        }
        break;
      }
    }
    if (!updated) {
      throw new NotFoundException();
    }
    await this.userRepository.save(user);
    return assignment;
  }

  async deleteAssignmentById(
    classId: string,
    assignmentId: string,
    userId: string,
  ) {
    const user: User = await this.userRepository.findOne({ id: userId });
    if (!user) {
      throw new NotFoundException();
    }
    let updated = false;
    let assignment: Assignment;
    for (const userClass of user.classes) {
      if (userClass.id === classId) {
        const assignmentIndex = userClass.assignments.findIndex(
          (assignment) => assignment.id === assignmentId,
        );
        if (assignmentIndex === -1) {
          throw new NotFoundException();
        }
        assignment = userClass.assignments.splice(assignmentIndex, 1)[0];
        this.updateGrade(
          userClass,
          assignment.type,
          assignment.pointsReceived,
          assignment.pointsWorth,
          false,
        );
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
