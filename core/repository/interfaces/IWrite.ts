export interface IWrite<T> {
  create(item: T): Promise<T | boolean>;
  update(id: string, item: T): Promise<T | boolean>;
  delete(id: string): Promise<T | boolean>;
}