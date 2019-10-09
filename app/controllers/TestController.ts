import { Controller, Get, Post, Body, Param, Put, Delete } from '../../core/decorators';
import { Hero } from '../models/Hero';
import { HeroRepository } from '../repositories/HeroRepository';

@Controller('heroes')
export class TestController {
  private repository = new HeroRepository();

  @Get('/')
  async getAllHeroes() {
    const heroes = await this.repository.find();
    const numberOfHeroes = await this.repository.countHeroes();

    return { heroes, numberOfHeroes };
  }

  @Get('/:id')
  async getOneHero(
    @Param('id') id: string
  ) {
    const hero = await this.repository.findOne(id);
    return { hero };
  }

  @Post('/new')
  async addHero(
    @Body() hero: Hero
  ) {
    const inserted = await this.repository.create(hero);
    const numberOfHeroes = await this.repository.countHeroes();

    return { inserted, numberOfHeroes };
  }

  @Put('/update/:id')
  async updateHero(
    @Param('id') id: string,
    @Body() hero: Hero
  ) {
    const updated = await this.repository.update(id, hero);
    const numberOfHeroes = await this.repository.countHeroes();

    return { updated, numberOfHeroes };
  }

  @Delete('/delete/:id')
  async deleteHero(
    @Param('id') id: string
  ) {
    const deleted = await this.repository.delete(id);
    const numberOfHeroes = await this.repository.countHeroes();

    return { deleted, numberOfHeroes };
  }
}
