import {
  IsArray,
  IsString,
  MinLength,
  ValidateNested,
  IsNumber,
} from "class-validator";
import { Type } from "class-transformer";
import { Assignment } from "./assignment.dto";
export class assignmentType {
  @IsString()
  @MinLength(1)
  name: string;

  @IsNumber()
  percentOfGrade: number;

  @IsNumber()
  currentGrade: number;

  @IsNumber()
  pointsReceived: number;

  @IsNumber()
  pointsWorth: number;
}

export class CreateClassDto {
  @MinLength(1)
  name: string;

  @MinLength(1)
  teacher: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => assignmentType)
  assignmentTypes: assignmentType[];
}

export class Class {
  @MinLength(1)
  name: string;

  @IsString()
  id: string;

  @MinLength(1)
  teacher: string;

  @IsNumber()
  grade: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => assignmentType)
  assignmentTypes: assignmentType[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Assignment)
  assignments: Assignment[];
}
