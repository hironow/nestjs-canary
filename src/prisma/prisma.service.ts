import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PersistentInterface } from '../interface/persistent';
import {
  PersistentGatewayContextInterface,
  PersistentGatewayInterface,
} from 'src/interface/persistent-gateway';
import { RequestLoggerService } from '../request-logger/request-logger.service';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
  implements OnModuleInit, PersistentGatewayInterface
{
  constructor(private readonly requestLogger: RequestLoggerService) {
    super({ log: ['query', 'info', 'warn', 'error'] });
  }

  async onModuleInit() {
    this.$on('query', (event) => {
      this.requestLogger.log(
        `Query: ${event.query}`,
        `Params: ${event.params}`,
        `Duration: ${event.duration} ms`,
      );
    });
    this.$on('info', (event) => {
      this.requestLogger.log(event.message);
    });
    this.$on('warn', (event) => {
      this.requestLogger.warn(event.message);
    });
    this.$on('error', (event) => {
      this.requestLogger.error(event.message);
    });
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
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
