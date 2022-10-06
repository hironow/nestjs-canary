import { AppService } from './app.service';
import { Resolver, Query } from '@nestjs/graphql';
import { RequestLoggerService } from './request-logger/request-logger.service';

@Resolver()
export class AppResolver {
  constructor(
    private readonly requestLogger: RequestLoggerService,
    private readonly appService: AppService,
  ) {}

  @Query(() => String)
  sayHello(): string {
    this.requestLogger.log('AppResolver / this is INFO log');
    this.requestLogger.warn('AppResolver / this is WARN log');
    this.requestLogger.error('AppResolver / this is ERROR log');
    return this.appService.getHello();
  }
}
