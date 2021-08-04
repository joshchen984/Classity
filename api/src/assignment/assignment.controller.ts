import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { UserId } from '../auth/userid.decorator';
import { AssignmentService } from './assignment.service';
import { assignmentDto } from '@classity/dto';

@Controller('assignment')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Roles('User')
  @Post()
  createAssignment(
    @Body() createAssignmentDto: assignmentDto.CreateAssignmentDto,
    @UserId() userId: string,
  ) {
    return this.assignmentService.createAssignment(createAssignmentDto, userId);
  }

  @Roles('User')
  @Delete('/:classId/:assignmentId')
  deleteAssignmentById(
    @Param('classId') classId: string,
    @Param('assignmentId') assignmentId: string,
    @UserId() userId: string,
  ) {
    return this.assignmentService.deleteAssignmentById(
      classId,
      assignmentId,
      userId,
    );
  }
}
