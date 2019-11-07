import { BaseRepository } from '../../core/repository/BaseRepository';
import { Hero } from '../models/Hero';
import { MongoClient } from 'mongodb';

export class HeroRepository extends BaseRepository<Hero> {
  constructor() {
    super(
      {
        connector: 'mongodb',
        user: '',
        password: '',
        database: 'warriors',
        collection: 'heroes'
      },
      new MongoClient('mongodb://localhost:27017', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    );
  }

  async countHeroes(): Promise<number | null> {
    if (!this._collection) return null;
    return await this._collection.countDocuments();
  }
}
