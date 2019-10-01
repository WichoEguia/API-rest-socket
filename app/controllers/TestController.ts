import { Controller, Post, Body, Param, Get } from '../../core/decorators';
import { RESPONSE_TEST_PARAMS, RESPONSE_TEST_REQUESTBODY } from '../spec/responses';
import { PARAMETERS_TOKEN_TEST_PARAMS, PARAMETERS_ID_TEST_PARAMS, REQUESTBODY_FROM_TEST_REQUESTBODY } from '../spec/params';

interface body {
  id: number;
  name: string;
  age: number;
}

@Controller('test')
export class TestController {
  @Get('/params/:id/:token', {
    summary: 'testing parameters',
    responses: {
      '200': RESPONSE_TEST_PARAMS
    }
  })
  async testParams(
    @Param('id', PARAMETERS_ID_TEST_PARAMS) id: string,
    @Param('token', PARAMETERS_TOKEN_TEST_PARAMS) token: string
  ) {
    return { id, token };
  }

  @Post('/bodyRequest', {
    summary: 'testing body request',
    responses: {
      '200': RESPONSE_TEST_REQUESTBODY
    }
  })
  async testBodyRequest(
    @Body(REQUESTBODY_FROM_TEST_REQUESTBODY) body: body
  ) {
    return body;
  }
}
