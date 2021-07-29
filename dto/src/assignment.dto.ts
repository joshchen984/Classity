import { MinLength, IsNumber, Min, IsInt, IsString } from "class-validator";

export class CreateAssignmentDto {
  @MinLength(1)
  name: string;

  @IsString()
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

export class Assignment {
  @MinLength(1)
  id: string;

  @MinLength(1)
  name: string;

  @IsString()
  description: string;

  @MinLength(1)
  type: string;

  @IsNumber()
  @Min(0)
  pointsReceived: number;

  @IsInt()
  @Min(1)
  pointsWorth: number;

  @IsString()
  createdAt: string;
}
