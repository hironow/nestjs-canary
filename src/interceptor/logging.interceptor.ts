import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType<GqlContextType>() === 'graphql') {
      const gqlContext = GqlExecutionContext.create(context);
      const message = this.toMessage(gqlContext);

      const info = gqlContext.getInfo();
      for (const fieldNode of info.fieldNodes) {
        const body = fieldNode.loc?.source?.body;

        this.logger.log(message, {
          fieldNode,
          body,
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
