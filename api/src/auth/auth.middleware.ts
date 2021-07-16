import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { getBearerTokenFromRequest } from './auth.util';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const bearerToken = getBearerTokenFromRequest(req);
    if (!bearerToken) {
      return next();
    }
    const { uid, email } = await this.authService.verifyIdToken(bearerToken);
    (req as any).id = uid;
    next();
  }
}
