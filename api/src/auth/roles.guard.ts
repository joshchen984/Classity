import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  isValidRole(role: Role): boolean {
    switch (role) {
      case 'User':
        break;
      default:
        return true;
    }
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    for (const role of roles) {
      if (this.isValidRole(role)) {
        return true;
      }
    }
    return false;
  }
}
