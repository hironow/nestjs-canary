import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { GraphQLResolveInfo } from 'graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as winston from 'winston';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly winstonLogger: winston.Logger) {}

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    this.winstonLogger.info('Before... on LoggingInterceptor');

    if (ctx.getType<GqlContextType>() === 'graphql') {
      // only in the context of Graphql request
      const gql = GqlExecutionContext.create(ctx);
      const req = gql.getContext().req as Request;
      const args = gql.getArgs();
      const info = gql.getInfo<GraphQLResolveInfo>();

      this.winstonLogger.info('body', req.body);
      this.winstonLogger.info('args', args);
      this.winstonLogger.info(`info.fieldName: ${info.fieldName}`);
      for (const fieldNode of info.fieldNodes) {
        this.winstonLogger.info(`fieldNode.name: ${fieldNode.name.value}`);
      }
    }

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          this.winstonLogger.info(
            `After... ${Date.now() - now}ms on LoggingInterceptor`,
          ),
        ),
      );
  }
}
