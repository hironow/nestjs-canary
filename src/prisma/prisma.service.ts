import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PersistentInterface } from '../interface/persistent';
import {
  PersistentGatewayContextInterface,
  PersistentGatewayInterface,
} from 'src/interface/persistent-gateway';
import { Logger } from 'winston';
import { createWinstonAccessLogger } from '../access-logger/';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
  implements OnModuleInit, PersistentGatewayInterface
{
  accessLogger: Logger = null;

  constructor() {
    super({ log: ['query', 'info', 'warn', 'error'] });
  }

  async onModuleInit() {
    this.$on('query', (event) => {
      this.accessLogger.debug(
        `Query: ${event.query}`,
        `Params: ${event.params}`,
        `Duration: ${event.duration} ms`,
      );
    });
    this.$on('info', (event) => {
      this.accessLogger.info(event.message);
    });
    this.$on('warn', (event) => {
      this.accessLogger.warn(event.message);
    });
    this.$on('error', (event) => {
      this.accessLogger.error(event.message);
    });
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async (event) => {
      this.accessLogger.debug(event.name);
      await app.close();
    });
  }

  getLogger(): Logger {
    if (this.accessLogger === null) {
      const newLogger = createWinstonAccessLogger('info');
      this.setLogger(newLogger);
    }
    return this.accessLogger;
  }

  setLogger(logger: Logger) {
    this.accessLogger = logger;
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
    this.accessLogger.debug('start transaction...');
    try {
      fn(ctx);
    } catch (error) {
      if (error instanceof Error) {
        this.accessLogger.error(error.message, error.name, error.stack);
      }
      this.accessLogger.debug('rollback transaction...');
      throw error;
    }
    this.accessLogger.debug('end transaction...');
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
