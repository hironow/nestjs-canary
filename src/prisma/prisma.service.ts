import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PersistentInterface } from 'src/interface/persistent';
import {
  PersistentGatewayContextInterface,
  PersistentGatewayInterface,
} from 'src/interface/persistent-gateway';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
  implements OnModuleInit, PersistentGatewayInterface
{
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {
    super({ log: ['query', 'info', 'warn', 'error'] });
  }

  async onModuleInit() {
    this.$on('query', (event) => {
      this.logger.log(
        `Query: ${event.query}`,
        `Params: ${event.params}`,
        `Duration: ${event.duration} ms`,
      );
    });
    this.$on('info', (event) => {
      this.logger.info(event.message);
    });
    this.$on('warn', (event) => {
      this.logger.warn(event.message);
    });
    this.$on('error', (event) => {
      this.logger.error(event.message);
    });
    await this.$connect();
  }

  getPersistent<T, U>(): PersistentInterface<T, U> {
    // const p = !ctx ? this : ctx
    // Pの型から定義を返したい
    // const user = this.user();
    // const post = this.post();

    throw new Error('Method not implemented.');
  }
  RunInTransaction(fn: (ctx: PersistentGatewayContextInterface) => void): void {
    const ctx = new PrismaContext();
    this.logger.info('start transaction...');
    try {
      fn(ctx);
    } catch (error) {
      this.logger.error(error);
      this.logger.info('rollback transaction...');
      throw error;
    }
    this.logger.info('end transaction...');
  }
}

class PrismaContext implements PersistentGatewayContextInterface {
  tx: any;

  constructor() {
    this.tx = {};
  }

  getPersistent<T, U>(): PersistentInterface<T, U> {
    // txから型から定義を返したい
    throw new Error('Method not implemented.');
  }
}
