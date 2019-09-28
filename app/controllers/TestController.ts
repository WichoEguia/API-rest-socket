import { Controller, Post, Body, Param, QueryParam, Middleware } from '../../core/decorators';
import { ping } from '../middlewares/ping';

@Controller('test')
export class TestController {
  @Middleware(ping)
  @Post('/body')
  public async testBody(@Body() body: any) {
    return body;
  }

  @Post('/param/:id?')
  public async testParams(@Param('id') id: string) {
    return id;
  }

  @Post('/query')
  public async testQuery(@QueryParam('message') msg: string) {
    return msg;
  }
}
