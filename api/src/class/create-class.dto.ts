import { assignmentType } from './class.document';
import { IsArray, IsString, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateClassDto {
  @MinLength(1)
  name: string;

  @MinLength(1)
  teacher: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => assignmentType)
  assignmentTypes: assignmentType[];

  @IsString()
  userId: string;
}
