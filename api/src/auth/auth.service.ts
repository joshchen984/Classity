import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  OnApplicationBootstrap,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userDto } from '@classity/dto';
import { User } from './user.entity';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService implements OnApplicationBootstrap {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  onApplicationBootstrap() {
    const firebaseOptions: admin.AppOptions = {
      credential: admin.credential.cert({
        projectId: this.configService.get('FIREBASE_PROJECT_ID'),
        privateKey: this.configService
          .get('FIREBASE_PRIVATE_KEY')
          .replace(/\\n/g, '\n'),
        clientEmail: this.configService.get('FIREBASE_CLIENT_EMAIL'),
      }),
      databaseURL: this.configService.get('FIREBASE_DB_URL'),
    };
    admin.initializeApp(firebaseOptions);
  }

  async signUp(createUserDto: userDto.CreateUserDto, userId: string) {
    const { email } = createUserDto;
    const user = this.userRepository.create({ email, id: userId });
    let createdUser: User;
    try {
      createdUser = await this.userRepository.save(user);
    } catch (e) {
      // duplicate key error
      if (e.code === 11000) {
        throw new ConflictException('Username already exists');
      } else {
        this.logger.error(
          `Can't add a user to mongodb because of code ${e.code}`,
        );
        throw new InternalServerErrorException();
      }
    }
    return createdUser;
  }
  async deleteAccount(userId: string) {
    await admin.auth().deleteUser(userId);
    await this.userRepository.delete({ id: userId });
  }

  async verifyIdToken(token: string) {
    try {
      const { email, uid } = await admin.auth().verifyIdToken(token, true);
      return { email, uid };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
