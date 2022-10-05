import { Inject, Injectable } from '@nestjs/common';
import { PersistentInterface } from 'src/interface/persistent';
import {
  PersistentGatewayContextInterface,
  PersistentGatewayInterface,
} from 'src/interface/persistent-gateway';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class InMemoryService implements PersistentGatewayInterface {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  getPersistent<T, U>(): PersistentInterface<T, U> {
    // key: P, value: T[] のObjを返す
    throw new Error('Method not implemented.');
  }

  RunInTransaction(fn: (ctx: PersistentGatewayContextInterface) => void): void {
    () => {
      const ctx = new InMemoryContext();
      this.logger.info('start transaction...');
      try {
        fn(ctx);
      } catch (error) {
        this.logger.error(error);
        this.logger.info('rollback transaction...');
        throw error;
      }
      this.logger.info('end transaction...');
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
