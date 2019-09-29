import { Controller, Post, Body, Param, QueryParam, Get, Req } from '../../core/decorators';

const PING_RESPONSE = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        greetings: { type: 'string' },
        url: { type: 'string' },
        date: { type: 'string' },
        headers: {
          type: 'object',
          properties: {
            'Content-Type': { type: 'string' },
          },
          additionalProperties: true,
        }
      },
    }
  }
};

@Controller('test')
export class TestController {
  @Get('/ping', {
    responses: {
      '200': PING_RESPONSE
    }
  })
  async ping(@Req() req: Request) {
    return {
      greetings: 'Hola desde EAPI',
      url: req.url,
      date: new Date(),
      headers: req.headers
    };
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
