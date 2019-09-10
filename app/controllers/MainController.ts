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
  @Get('/message/:message?')
  @Middleware(sayHello)
  public index(req: Request, res: Response) {
    let responseData: MainResponse = {
      message: req.params.message || undefined,
      date: new Date(),
      headers: req.headers
    }

    res.send(responseData);
  }

  @Get('/hello')
  public hello(req: Request, res: Response) {
    res.end('Hola Mundo');
  }
}
