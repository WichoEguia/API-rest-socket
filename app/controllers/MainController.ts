import { Controller, Get, Req, Header } from '../../core/decorators';
import { HEADER_TOKEN_TEST_PARAMS } from '../spec/params';

const SCHEMA_PING = {
  type: 'object',
  properties: {
    greetings: { type: 'string' },
    date: { type: 'string' },
    url: { type: 'string' },
    headers: { type: 'object' }
  }
};

const RESPONSE_PING = {
  description: 'Ping response',
  content: {
    'application/json': {
      schema: SCHEMA_PING
    }
  }
};

@Controller('ping')
export class MainController {
  @Get('/', {
    summary: 'Ping',
    description: 'Make a ping request to test the API funtionality',
    responses: {
      '200': RESPONSE_PING
    }
  })
  async ping(
    @Req() req: Request,
    @Header('token', HEADER_TOKEN_TEST_PARAMS) token: string
  ) {
    return {
      greetings: 'Hello from EAPI',
      date: new Date(),
      url: req.url,
      headers: req.headers,
      token
    };
  }
}
