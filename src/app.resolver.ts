import { AppService } from './app.service';
import { Resolver, Query } from '@nestjs/graphql';
import { RequestLoggerService } from './request-logger/request-logger.service';
import { errorSayGoodnight } from './error';

@Resolver()
export class AppResolver {
  constructor(
    private readonly requestLogger: RequestLoggerService,
    private readonly appService: AppService,
  ) {}

  @Query(() => String, {
    description: 'say hello',
  })
  sayHello(): string {
    this.requestLogger.log('AppResolver / this is INFO log');
    this.requestLogger.warn('AppResolver / this is WARN log');
    this.requestLogger.error('AppResolver / this is ERROR log');
    return this.appService.getHello();
  }

  @Query(() => String, {
    description: 'say Goodnight (error)',
  })
  sayGoodnight(): string {
    this.requestLogger.log('call goodnight... bad throw error!');
    throw Error(errorSayGoodnight());
  }
}
