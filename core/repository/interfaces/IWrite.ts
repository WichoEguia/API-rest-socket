export interface IWrite<T> {
  create(item: T): Promise<T | null>;
  update(id: string, item: T): Promise<T | null>;
  delete(id: string): Promise<T | null>;
}