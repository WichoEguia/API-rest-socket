import { Controller, Get } from '../system/core/decorators';
import { Request, Response } from 'express';

@Controller('/main')
export default class MainController {
  @Get('/:message?')
  index(req: Request, res: Response) {
    let complemento = req.params.message || '';
    return res.send(`This is the main controller ${req.params.message || '.'}`);
  }
}
