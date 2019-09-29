import { Controller, Post, Body, Param, QueryParam, Middleware, Get, Req } from '../../core/decorators';

@Controller('test')
export class TestController {
  @Get('/ping')
  async ping(@Req() req: Request) {
    return req.headers;
  }

  @Post('/body')
  async testBody(@Body() body: any) {
    return body;
  }

  @Post('/param/:id?')
  async testParams(@Param('id') id: string) {
    return id;
  }

  @Post('/query')
  async testQuery(@QueryParam('message') msg: string) {
    return msg;
  }
}
