import { Controller, Post, Body, Param, Put } from '../../core/decorators';
import { Hero } from '../models/Hero';

import { HeroRepository } from '../repositories/HeroRepository';
import { Delete, Get } from '../../core/decorators/REST/RestMethods';

@Controller('test')
export class TestController {
  private repository = new HeroRepository();

  @Get('/hero')
  async getAllHeroes() {
    const heroes = await this.repository.find();
    const numberOfHeroes = await this.repository.countHeroes();

    return { heroes, numberOfHeroes };
  }

  @Get('/hero/:id')
  async getOneHero(
    @Param('id') id: string
  ) {
    const hero = await this.repository.findOne(id);
    return { hero };
  }

  @Post('/hero')
  async addHero(
    @Body() hero: Hero
  ) {
    const inserted = await this.repository.create(hero);
    const numberOfHeroes = await this.repository.countHeroes();

    return { inserted, numberOfHeroes };
  }

  @Put('/hero/:id')
  async updateHero(
    @Param('id') id: string,
    @Body() hero: Hero
  ) {
    const updated = await this.repository.update(id, hero);
    const numberOfHeroes = await this.repository.countHeroes();

    return { updated, numberOfHeroes };
  }

  @Delete('/hero/:id')
  async deleteHero(
    @Param('id') id: string
  ) {
    const deleted = await this.repository.delete(id);
    const numberOfHeroes = await this.repository.countHeroes();

    return { deleted, numberOfHeroes };
  }
}
