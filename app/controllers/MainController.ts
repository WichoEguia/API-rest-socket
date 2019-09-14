import { Controller, Get, Middleware } from '../../core/decorators';
import { Request, Response } from 'express';

import { sayHello } from '../middlewares/hi';

@Controller('main')
export class MainController {
  @Get('/hello')
  @Middleware(sayHello)
  public hello(req: Request, res: Response, next: any) {
    return res.json({
      header: req.headers
    });
  }
}
