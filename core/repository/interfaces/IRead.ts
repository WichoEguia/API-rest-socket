export interface IRead<T> {
  find(item: T): Promise<T[] | null>;
  findOne(id: string): Promise<T | null>;
}