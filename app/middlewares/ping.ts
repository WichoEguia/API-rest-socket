import { Request, Response, NextFunction } from 'express';

export const ping = (req: Request, res: Response, next: NextFunction) => {
  console.log('pong', req.headers);
  next();
}