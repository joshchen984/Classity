import { Test, TestingModule } from '@nestjs/testing';
import { MongoRepository } from 'typeorm';
import { User } from '../auth/user.entity';
import { ClassService } from './class.service';
import { mockUserRepositoryProvider } from '../auth/user.mock';

type a = MongoRepository<User>;

describe('ClassService', () => {
  let service: ClassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassService, mockUserRepositoryProvider()],
    }).compile();

    service = module.get<ClassService>(ClassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
