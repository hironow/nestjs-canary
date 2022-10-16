import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { errorSayGoodnight } from './error';
import { RequestLoggerService } from './request-logger/request-logger.service';

@Controller()
export class AppController {
  constructor(
    private readonly requestLogger: RequestLoggerService,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    this.requestLogger.warn('AppController / this is WARN log');
    this.requestLogger.error('AppController / this is ERROR log');
    return this.appService.getHello();
  }

  @Get('error')
  sayGoodnight(): string {
    this.requestLogger.log('call goodnight... bad throw error!');
    throw Error(errorSayGoodnight());
  }
}
