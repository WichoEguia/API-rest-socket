import { Controller, Get, Middleware } from '../../core/decorators';
import { Request, Response, NextFunction } from 'express';

import { sayHello } from '../middlewares/hi';

@Controller('ping')
export class PingController {
  @Get()
  // @Middleware(sayHello)
  public hello(req: Request) {
    // throw new Error('Hola crayola');
    return { headers: req.headers };
  }
}
