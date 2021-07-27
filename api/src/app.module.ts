import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClassModule } from './class/class.module';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { ConfigModule } from '@nestjs/config';
import { AssignmentModule } from './assignment/assignment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/classity',
      useUnifiedTopology: true,
      synchronize: true,
      entities: [User],
    }),
    ClassModule,
    AuthModule,
    AssignmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
