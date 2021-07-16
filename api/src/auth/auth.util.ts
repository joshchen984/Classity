import { Request } from 'express';

export const getBearerTokenFromRequest = (req: Request): string | undefined => {
  const authParts = req.headers.authorization?.split(' ');
  if (!authParts || authParts.length !== 2 || authParts[0] !== 'Bearer') {
    return;
  }

  const bearerToken = authParts[1];
  return bearerToken;
};
