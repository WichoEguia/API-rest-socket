import { Controller, Get, Req } from '../../core/decorators';

const RESPONSE_PING = {
  description: 'Ping response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          greetings: { type: 'string' },
          date: { type: 'string' },
          url: { type: 'string' },
          headers: { type: 'object' }
        }
      }
    }
  }
};

@Controller('ping')
export class MainController {
  @Get('/', {
    summary: 'Make a ping request',
    responses: {
      '200': RESPONSE_PING
    }
  })
  async ping(
    @Req() req: Request
  ) {
    return {
      greetings: 'Hello from EAPI',
      date: new Date(),
      url: req.url,
      headers: req.headers
    };
  }
}
