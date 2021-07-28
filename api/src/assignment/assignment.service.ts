import { Injectable } from '@nestjs/common';
import { assignmentDto } from '@classity/dto';

@Injectable()
export class AssignmentService {
  createAssignment(
    createAssignmentDto: assignmentDto.CreateAssignmentDto,
    userId: string,
  ) {}
}
