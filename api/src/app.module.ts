import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClassModule } from './class/class.module';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AssignmentModule } from './assignment/assignment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const synchronize: boolean = process.env.NODE_ENV === 'development';
        return {
          type: 'mongodb',
          url: configService.get('MONGODB_URL'),
          username: configService.get('MONGODB_USERNAME'),
          password: configService.get('MONGODB_PASSWORD'),
          useUnifiedTopology: true,
          synchronize,
          entities: [User],
        };
      },
      inject: [ConfigService],
    }),
    ClassModule,
    AuthModule,
    AssignmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
