import { assignmentType } from './class.entity';
import { IsArray, MinLength, ValidateNested } from 'class-validator';
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
}
