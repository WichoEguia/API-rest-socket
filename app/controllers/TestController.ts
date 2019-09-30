import { Controller, Post, Body, Param, QueryParam, Get, Req } from '../../core/decorators';
import { specBuilder } from '../../core/decorators/SpecBuilder';

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
  async ping(
    @Req() req: Request
  ) {
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

  @Post('/param/:id?', {
    responses: {
      '200': {
        description: 'Test with params response',
        content: {
          'application/json': {
            schema: {
              id: { type: 'string' }
            }
          }
        }
      }
    }
  })
  async testParams(
    @Param('id', {
      name: 'id',
      description: 'Identification for the element.',
      required: true
    }) id: string
  ) {
    return id;
  }

  @Post('/query', {
    responses: {
      '200': {
        description: 'Message sent',
        content: {
          'application/json': {
            schema: {
              msg: { type: 'string' }
            }
          }
        }
      }
    }
  })
  async testQuery(
    @QueryParam('message', {
      name: 'message',
      description: 'Request message.',
      required: true
    }
    ) msg: string) {
    return { msg };
  }

  @Post('/paramAndQuery/:id?', {
    responses: {
      '200': {
        description: 'Test with params and query response',
        content: {
          'application/json': {
            schema: {
              id: { type: 'string' },
              msg: { type: 'string' }
            }
          }
        }
      }
    }
  })
  async testParamsAndQuery(
    @Param('id', {
      name: 'id',
      description: 'Identification for the element.',
      required: false
    }) id: string = 'hahaha',

    @QueryParam('message', {
      name: 'msg',
      description: 'Get message from request',
      required: true
    }) msg: string
  ) {
    return { id, msg };
  }
}
