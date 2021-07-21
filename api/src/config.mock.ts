import { ConfigService } from '@nestjs/config';

export const mockConfigService = () => ({});
export const mockConfigServiceProvider = () => ({
  provide: ConfigService,
  useFactory: mockConfigService,
});
