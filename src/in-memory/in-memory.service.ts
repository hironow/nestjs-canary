import { Injectable } from '@nestjs/common';
import { PersistentInterface } from '../interface/persistent';
import {
  PersistentGatewayContextInterface,
  PersistentGatewayInterface,
} from '../interface/persistent-gateway';
import { RequestLoggerService } from '../request-logger/request-logger.service';

@Injectable()
export class InMemoryService implements PersistentGatewayInterface {
  constructor(private readonly requestLogger: RequestLoggerService) {}

  getPersistent<T, U>(): PersistentInterface<T, U> {
    // key: P, value: T[] のObjを返す
    throw new Error('Method not implemented.');
  }

  RunInTransaction(fn: (ctx: PersistentGatewayContextInterface) => void): void {
    () => {
      const ctx = new InMemoryContext();
      this.requestLogger.log('start transaction...');
      try {
        fn(ctx);
      } catch (error) {
        if (error instanceof Error) {
          this.requestLogger.error(error.message, error.name, error.stack);
        }
        this.requestLogger.log('rollback transaction...');
        throw error;
      }
      this.requestLogger.log('end transaction...');
    };
  }
}

class InMemoryContext implements PersistentGatewayContextInterface {
  before: any;

  constructor() {
    this.before = {};
  }

  getPersistent<T, U>(): PersistentInterface<T, U> {
    // key: P, value: T[] のObjを返す、ただしTx付き
    throw new Error('Method not implemented.');
  }
}
