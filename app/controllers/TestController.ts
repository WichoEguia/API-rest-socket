import { Controller, Post, Body, Param, Get, Req } from '../../core/decorators';
import { RESPONSE_TEST_PARAMS, RESPONSE_TEST_REQUESTBODY } from '../spec/responses';
import { PARAMETERS_TOKEN_TEST_PARAMS, PARAMETERS_ID_TEST_PARAMS, REQUESTBODY_FROM_TEST_REQUESTBODY } from '../spec/params';
import { Hero } from '../models/Hero';

import { HeroRepository } from '../repositories/HeroRepository';
import { MongoClient } from 'mongodb';

interface body {
  id: number;
  name: string;
  age: number;
}

@Controller('test')
export class TestController {
  private repository: HeroRepository;

  constructor() {
    const client = new MongoClient('mongodb://localhost');
    client.connect((err) => {
      const db = client.db('warriors');
      this.repository = new HeroRepository(db, 'heroes');
    });
  }

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

  @Post('/hero')
  async addHero(
    @Body() hero: Hero
  ) {
    const result = await this.repository.create(hero);
    return `Insert hero ${result ? 'success' : 'fail'}`;
  }
}
