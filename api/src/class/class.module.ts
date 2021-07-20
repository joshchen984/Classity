import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
