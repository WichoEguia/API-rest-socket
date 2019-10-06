import { BaseRepository } from '../../core/repository/BaseRepository';
import { Hero } from '../models/Hero';

export class HeroRepository extends BaseRepository<Hero> {
  constructor() {
    super({
      "connector": "mongodb",
      "url": "mongodb://localhost:27017",
      "port": 27017,
      "user": "",
      "password": "",
      "database": "warriors",
      "useNewUrlParser": true
    });
  }

  async countHeroes(): Promise<number | null> {
    if (!this._collection) return null;
    return await this._collection.countDocuments();
  }
}