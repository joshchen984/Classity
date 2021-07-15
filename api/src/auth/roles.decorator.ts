import { SetMetadata } from '@nestjs/common';

export type Role = 'User';
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
