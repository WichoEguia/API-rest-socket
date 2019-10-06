import { IWrite } from './interfaces/IWrite';
import { IRead } from './interfaces/IRead';

import { MongoClient, Collection, ObjectID } from 'mongodb';
import chalk from 'chalk';

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  public _collection: Collection | null = null;

  constructor(dataset: any) {
    const client = new MongoClient(dataset.url, {
      useNewUrlParser: dataset.useNewUrlParser,
      useUnifiedTopology: true
    });
    client.connect((err) => {
      if (err) {
        console.log(
          chalk.red('Ha ocurrido un error al intentar conectar con la base de datos.'),
          '\n' + err.message
        );
      }

      const db = client.db('warriors');
      this._collection = db.collection(dataset.database);
    });
  }

  async create(item: T): Promise<T | null> {
    if (!this._collection) return null;
    const result = await this._collection.insertOne(item);
    return result.ops[0];
  }

  async update(id: string, item: T): Promise<T | null> {
    if (!this._collection) return null;
    const result = await this._collection.findOneAndUpdate(
      { '_id': new ObjectID(id) },
      { $set: { ...item } },
      { returnOriginal: false }
    );
    return result.value;
  }

  async delete(id: string): Promise<T | null> {
    if (!this._collection) return null;
    const result = await this._collection.findOneAndDelete({ '_id': new ObjectID(id) });
    return result.value;
  }

  async find(): Promise<T[] | null> {
    if (!this._collection) return null;
    const result = await this._collection.find({}).toArray();
    return result;
  }

  async findOne(id: string): Promise<T | null> {
    if (!this._collection) return null;
    const result = await this._collection.find({ '_id': new ObjectID(id) }).toArray();
    return result[0];
  }
}