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

      const db = client.db(dataset.database);
      this._collection = db.collection(dataset.collection);
    });
  }

  async create(item: T): Promise<T | boolean> {
    if (!this._collection) return false;
    try {
      const result = await this._collection.insertOne(item);
      return result.ops[0];
    } catch (e) {
      return false;
    }
  }

  async update(id: string, item: T): Promise<T | boolean> {
    if (!this._collection) return false;
    try {
      const result = await this._collection.findOneAndUpdate(
        { '_id': new ObjectID(id) },
        { $set: { ...item } },
        { returnOriginal: false }
      );
      return result.value;
    } catch (e) {
      return false;
    }
  }

  async delete(id: string): Promise<T | boolean> {
    if (!this._collection) return false;
    try {
      const result = await this._collection.findOneAndDelete({ '_id': new ObjectID(id) });
      return result.value;
    } catch (e) {
      return false;
    }
  }

  async find(): Promise<T[] | boolean> {
    if (!this._collection) return false;
    const result = await this._collection.find({}).toArray();
    return result.length ? result : false
  }

  async findOne(id: string): Promise<T | boolean> {
    if (!this._collection) return false;
    const result = await this._collection.find({ '_id': new ObjectID(id) }).toArray();

    return result.length ? result[0] : false
  }
}