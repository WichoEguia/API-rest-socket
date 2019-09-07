import { Controller, Get } from '../system/core/decorators';
import { Request, Response } from 'express';

interface MainResponse {
  message?: string;
  headers: Object;
  date: Date;
}

@Controller('/main')
export default class MainController {
  @Get('/:message?')
  public index(req: Request, res: Response) {
    let responseData: MainResponse = {
      message: req.params.message || undefined,
      date: new Date(),
      headers: req.headers
    }

    res.json(responseData);
  }
}
