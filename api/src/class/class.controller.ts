import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';
import { UserId } from 'src/auth/userid.decorator';
import { ClassService } from './class.service';
import { CreateClassDto } from './create-class.dto';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Roles('User')
  @Post()
  createClass(
    @Body() createClassDto: CreateClassDto,
    @UserId() userId: string,
  ) {
    return this.classService.createClass(createClassDto, userId);
  }

  @Roles('User')
  @Get()
  getUserClasses(@UserId() userId: string) {
    return this.classService.getUserClasses(userId);
  }
  // @Get('/:id')
  // getClassById(@Param('id') id: string) {
  //   return this.classService.getClass(id);
  // }
}
