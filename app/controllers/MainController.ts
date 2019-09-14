import { Controller, Get, Middleware } from '../../core/decorators';
import { Request, Response } from 'express';

import { sayHello } from '../middlewares/hi';

interface MainResponse {
  message?: string;
  headers: Object;
  date: Date;
}

@Controller('main')
export class MainController {
  @Get('/hello')
  public hello(req: Request, res: Response) {
    res.end('Hola Mundo');
  }
}
