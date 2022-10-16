// UserRepository, PostRepository に相当
export interface PersistentInterface<T, U> {
  identity: U;

  get(arg: U): T | null;
  getMany(arg: U[]): T[] | null;

  save(arg: T): U;
  saveMany(arg: T[]): U[];
}
