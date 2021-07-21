export const mockUserRepository = () => ({});

export const mockUserRepositoryProvider = () => ({
  provide: 'UserRepository',
  useFactory: mockUserRepository,
});
