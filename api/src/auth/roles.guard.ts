import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';
import { Role } from './roles.decorator';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  isValidRole(role: Role, request: Request): boolean {
    switch (role) {
      case 'User':
        if ((request as any).userId) {
          return true;
        } else {
          return false;
        }
      default:
        return true;
    }
  }

  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (roles === undefined) {
      return true;
    }
    const request: Request = context.switchToHttp().getRequest();
    for (const role of roles) {
      if (this.isValidRole(role, request)) {
        return true;
      }
    }
    return false;
  }
}
