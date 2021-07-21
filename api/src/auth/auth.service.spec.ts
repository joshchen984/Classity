import { Test, TestingModule } from '@nestjs/testing';
import { mockConfigServiceProvider } from '../config.mock';
import { AuthService } from './auth.service';
import { mockUserRepositoryProvider } from './user.mock';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        mockUserRepositoryProvider(),
        mockConfigServiceProvider(),
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
