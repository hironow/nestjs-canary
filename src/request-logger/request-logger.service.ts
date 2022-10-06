import {
  ExecutionContext,
  Inject,
  Injectable,
  LoggerService,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import * as winston from 'winston';
import { Request } from 'express';
import { LoggingWinston } from '@google-cloud/logging-winston';
import * as lw from '@google-cloud/logging-winston';
import { CONTEXT, GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { GlobalConfigService } from '../global-config/global-config.service';

const HEADER_GCP_TRACE = 'X-Cloud-Trace-Context';

@Injectable({ scope: Scope.REQUEST, durable: true })
export class RequestLoggerService implements LoggerService {
  private winstonLogger: winston.Logger;
  private trace: string;

  constructor(
    @Inject(GlobalConfigService) private readonly config: GlobalConfigService,
    @Inject(REQUEST) private readonly req: Request,
    @Inject(CONTEXT) private readonly ctx: ExecutionContext,
  ) {
    // get request from http or graphql request see: https://github.com/nestjs/graphql/issues/325#issuecomment-1128103707
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const request = ctx?.req || req;
    const traceIdFromReq = RequestLoggerService.getTraceFromRequest(request);
    const traceId = traceIdFromReq;

    const projectId = this.config.get('gcp.projectId');
    this.trace = `projects/${projectId}/traces/${traceId}`;

    const loggingWinston = new LoggingWinston({
      projectId: projectId,
      redirectToStdout: true,
      inspectMetadata: true,
      useMessageField: true,
    });

    this.winstonLogger = winston.createLogger({
      level: 'debug',
      defaultMeta: {
        ...lw.getDefaultMetadataForTracing(),
        'logging.googleapis.com/trace': this.trace,
      },
      transports: [loggingWinston],
    });
  }

  static getTraceFromRequest(req: Request): string {
    let traceId;
    let _spanId;
    try {
      const traceCtx = req?.get(HEADER_GCP_TRACE);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      [traceId, _spanId] = traceCtx?.split('/');
    } catch (error) {
      return '';
    }
    return traceId;
  }

  // getTraceFromContext current not working...
  static getTraceFromContext(ctx: ExecutionContext): string {
    let traceId;
    let _spanId;
    try {
      if (ctx.getType<GqlContextType>() === 'graphql') {
        // only in the context of Graphql request
        const gql = GqlExecutionContext.create(ctx);
        const req = gql.getContext().req;
        const traceCtx = req.get(HEADER_GCP_TRACE);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        [traceId, _spanId] = traceCtx?.split('/');
      }
    } catch (error) {
      console.log(error);
      return '';
    }
    return traceId;
  }

  private getMetaTrace(): any[] {
    return [
      {
        'logging.googleapis.com/trace': this.trace,
        // 'logging.googleapis.com/spanId': '',
      },
    ];
  }

  log(message: any, ...optionalParams: any[]) {
    this.winstonLogger.info(message); //, this.getMetaTrace());
  }

  error(message: any, ...optionalParams: any[]) {
    this.winstonLogger.error(message); //, this.getMetaTrace());
  }

  warn(message: any, ...optionalParams: any[]) {
    this.winstonLogger.warn(message); //, this.getMetaTrace());
  }
}
