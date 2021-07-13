import { Body, Controller, Post } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './create-class.dto';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  createClass(@Body() createClassDto: CreateClassDto) {
    return this.classService.createClass(createClassDto);
  }
}
