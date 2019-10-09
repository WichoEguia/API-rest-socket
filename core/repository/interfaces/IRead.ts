export interface IRead<T> {
  find(item: T): Promise<T[] | boolean>;
  findOne(id: string): Promise<T | boolean>;
}