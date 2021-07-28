import { MinLength, IsNumber, Min, IsInt } from "class-validator";

export class CreateAssignmentDto {
  @MinLength(1)
  name: string;

  @MinLength(1)
  description: string;

  @MinLength(1)
  assignmentType: string;

  @Min(0)
  @IsNumber()
  pointsReceived: number;

  @Min(1)
  @IsInt()
  pointsWorth: number;

  @MinLength(1)
  classId: string;
}
