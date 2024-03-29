import { Body, Controller, Post, Get, Param, Delete } from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { UserId } from '../auth/userid.decorator';
import { ClassService } from './class.service';
import { classDto } from '@classity/dto';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Roles('User')
  @Post()
  createClass(
    @Body() createClassDto: classDto.CreateClassDto,
    @UserId() userId: string,
  ) {
    return this.classService.createClass(createClassDto, userId);
  }

  @Roles('User')
  @Get()
  getUserClasses(@UserId() userId: string) {
    return this.classService.getUserClasses(userId);
  }
  @Roles('User')
  @Get('/:id')
  getUserClass(@UserId() userId: string, @Param('id') classId: string) {
    return this.classService.getUserClass(userId, classId);
  }

  @Roles('User')
  @Delete('/:id')
  deleteClassById(@Param('id') id: string, @UserId() userId: string) {
    return this.classService.deleteClassById(id, userId);
  }
  // @Get('/:id')
  // getClassById(@Param('id') id: string) {
  //   return this.classService.getClass(id);
  // }
}
