import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';
import { ClassService } from './class.service';
import { CreateClassDto } from './create-class.dto';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Roles('User')
  @Post()
  createClass(@Body() createClassDto: CreateClassDto) {
    return this.classService.createClass(createClassDto);
  }

  // @Get('/:id')
  // getClassById(@Param('id') id: string) {
  //   return this.classService.getClass(id);
  // }
}
