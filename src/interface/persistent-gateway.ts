import { PersistentInterface } from './persistent';

export interface PersistentGatewayInterface {
  getPersistent<T, U>(): PersistentInterface<T, U>;
  RunInTransaction(fn: (ctx: PersistentGatewayContextInterface) => void): void;
}

export interface PersistentGatewayContextInterface {
  getPersistent<T, U>(): PersistentInterface<T, U>;
}
