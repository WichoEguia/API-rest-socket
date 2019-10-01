import { Controller, Post, Body, Param, QueryParam, Get, Req } from '../../core/decorators';

@Controller('test')
export class TestController {
  @Get('/param/:id/:token', {
    responses: {
      '200': {
        description: 'Test with params response',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: {
                  description: 'Identificator',
                  type: 'string'
                },
                token: {
                  description: 'Generic token',
                  type: 'string'
                }
              }
            }
          }
        }
      }
    }
  })
  async testParams(
    @Param('id', {
      "name": "id",
      "in": "path",
      "description": "The token identifier string",
      "required": true,
      "schema": {
        "type": "string"
      }
    }) id: string,
    @Param('token', {
      "name": "token",
      "in": "path",
      "description": "The token identifier string",
      "required": false,
      "schema": {
        "type": "string"
      }
    }) token: string
  ) {
    return { id, token };
  }
}
