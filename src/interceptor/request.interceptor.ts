import {
  Injectable,
  NestInterceptor,
  CallHandler,
  Logger,
  ContextType,
  ExecutionContext,
} from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  private readonly logger = new Logger(RequestInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // accessのtraceをapplication logでも使えるようにする
    if (context.getType<ContextType>() === 'http') {
      const request = context.switchToHttp().getRequest();
      const response = context.switchToHttp().getResponse();

      // requestがundefined?
      this.logger.log('request: ', { ...request });
      this.logger.log('response: ', { ...response });

      const headers = request.headers;
      this.logger.log('headers: ', headers);

      const trace = headers['X-Cloud-Trace-Context'];
      this.logger.log('trace: ', trace);
    } else if (context.getType<GqlContextType>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context);

      const headers = ctx.getContext().req.headers;
      this.logger.log('headers: ', headers);

      const trace = headers['X-Cloud-Trace-Context'];
      this.logger.log('trace: ', trace);

      const message = this.toMessage(ctx);

      const info = ctx.getInfo();
      for (const fieldNode of info.fieldNodes) {
        const body = fieldNode.loc?.source?.body;

        this.logger.log(message, {
          // fieldNode,
          // body,
        });
      }
      return next.handle();
    }
    return next.handle();
  }

  private toMessage(gqlCtx: GqlExecutionContext): string {
    const info = gqlCtx.getInfo();
    const parentType = info.parentType.name;
    const fieldName = info.fieldName;
    const message = `GraphQL - ${parentType} - ${fieldName}`;
    return message;
  }
}
